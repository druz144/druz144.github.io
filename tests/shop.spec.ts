import { expect, test, type Page } from "@playwright/test";

const key = "druz144.cart.v1";
const endpoint = "https://formspree.io/f/xvzlawdw";

async function addKit(page: Page) {
  await page.goto("/#/products");
  await page.getByRole("button", { name: "Add to cart" }).first().click();
  await page.getByRole("link", { name: "Cart", exact: true }).click();
  await expect(page.getByRole("heading", { name: "Items (1)" })).toBeVisible();
}

async function fillDetails(page: Page) {
  await page
    .getByRole("textbox", { name: "Name", exact: true })
    .fill("Test Customer");
  await page.getByRole("textbox", { name: "E-mail" }).fill("test@example.com");
  await page.getByRole("textbox", { name: "Country" }).fill("Germany");
}

test("cart quantities persist across pages and reloads", async ({ page }) => {
  await addKit(page);
  await page.getByRole("button", { name: "Increase amount" }).click();
  await page.reload();
  await expect(page.getByRole("heading", { name: "Items (2)" })).toBeVisible();
  await page.getByRole("button", { name: "Decrease amount" }).click();
  await page.getByRole("button", { name: /^Remove .* from cart$/ }).click();
  await expect(page.getByText("Your cart is empty.")).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Place order" }),
  ).toBeDisabled();
});

test("invalid stored items and prototype product IDs do not crash", async ({
  page,
}) => {
  await page.goto("/");
  await page.evaluate(
    (key) =>
      localStorage.setItem(
        key,
        JSON.stringify([
          { id: "constructor", amount: 1 },
          { id: "__proto__", amount: 2 },
          { id: "missing", amount: 1 },
          { id: "cfm56-7b_revell", amount: { valueOf: 1, toString: 1 } },
        ]),
      ),
    key,
  );
  await page.goto("/#/cart");
  await page.reload();
  await expect(page.getByText("Your cart is empty.")).toBeVisible();
  await page.goto("/#/products/constructor");
  await expect(page.getByText("Kit not found.")).toBeVisible();
});

test("failed checkout preserves cart and supports retry", async ({ page }) => {
  await addKit(page);
  await fillDetails(page);
  await page.route(endpoint, (route) =>
    route.fulfill({ status: 500, body: "{}" }),
  );
  await page.getByRole("button", { name: "Place order" }).click();
  await expect(
    page.getByText("Something went wrong. Please try again."),
  ).toBeVisible();
  await expect(page.getByRole("heading", { name: "Items (1)" })).toBeVisible();
  await expect(
    page.getByRole("textbox", { name: "Name", exact: true }),
  ).toHaveValue("Test Customer");
  await page.route(endpoint, async (route) => {
    const body = route.request().postDataJSON();
    expect(body.email).toBe("test@example.com");
    expect(body.itemsCount).toBe(1);
    expect(body.items).toHaveLength(1);
    await route.fulfill({ status: 200, body: "{}" });
  });
  await page.getByRole("button", { name: "Place order" }).click();
  await expect(page.getByText(/Order sent/)).toBeVisible();
  await expect(page.getByText("Your cart is empty.")).toBeVisible();
});

test("checkout retains quantities added while sending", async ({ page }) => {
  await addKit(page);
  await fillDetails(page);
  let release!: () => void;
  const pending = new Promise<void>((resolve) => {
    release = resolve;
  });
  await page.route(endpoint, async (route) => {
    await pending;
    await route.fulfill({ status: 200, body: "{}" });
  });
  const request = page.waitForRequest(endpoint);
  await page.getByRole("button", { name: "Place order" }).click();
  await request;
  await page.getByRole("button", { name: "Increase amount" }).click();
  release();
  await expect(page.getByText(/Order sent/)).toBeVisible();
  await expect(page.getByRole("heading", { name: "Items (1)" })).toBeVisible();
});

test("gallery opens and supports keyboard navigation", async ({ page }) => {
  await page.goto("/#/products/cfm56-7b_revell");
  await page.getByRole("button", { name: /Open .* image 1 of/ }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("ArrowRight");
  await expect(page.getByRole("dialog")).toHaveAccessibleName(/image 2 of/);
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).not.toBeVisible();
});

test("navigation fits a narrow mobile screen", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 700 });
  await page.goto("/");
  await expect(
    page.getByRole("link", { name: "Cart", exact: true }),
  ).toBeInViewport();
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth),
  ).toBeLessThanOrEqual(320);
});
