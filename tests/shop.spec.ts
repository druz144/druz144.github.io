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

test("document categories filter products and survive reload", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Aftermarket parts and 3D models for airliner kits",
  );
  await page
    .getByRole("navigation", { name: "Product categories" })
    .getByRole("link", { name: "Airbus", exact: true })
    .click();
  await expect(page.getByLabel("Scale", { exact: true })).toHaveValue("1/144");
  await expect(page.getByLabel("Aircraft manufacturer")).toHaveValue("Airbus");
  await expect(
    page.locator("main h2").filter({ hasText: "Boeing" }),
  ).toHaveCount(0);
  await expect(
    page
      .locator("main")
      .getByText("Airbus A319/320/321", { exact: true })
      .first(),
  ).toBeVisible();
  await page.reload();
  await expect(page.getByLabel("Aircraft manufacturer")).toHaveValue("Airbus");
  await page.getByLabel("Scale", { exact: true }).selectOption("1/200");
  await expect(page.getByLabel("Aircraft manufacturer")).toHaveCount(0);
  await expect(page.getByRole("status")).toHaveText("5 products");
  await page
    .getByRole("link", { name: "3D models (STL files) 1/72", exact: true })
    .click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "3D models (STL files)",
  );
  await expect(page.getByText("No STL files are listed yet.")).toBeVisible();
  await page
    .getByRole("navigation", { name: "Product categories" })
    .getByRole("link", { name: "Aircraft kits", exact: true })
    .click();
  await expect(
    page.getByText("No aircraft kits are listed yet."),
  ).toBeVisible();
  await page
    .getByRole("navigation", { name: "Product categories" })
    .getByRole("link", { name: "In progress", exact: true })
    .click();
  await expect(
    page.getByText("Project updates will appear here."),
  ).toBeVisible();
});

test("header search finds kits and handles no results", async ({ page }) => {
  await page.goto("/");
  await page
    .getByRole("searchbox", { name: "Search products" })
    .fill("CFM56 Revell");
  await page.getByRole("button", { name: "Search", exact: true }).click();
  await expect(
    page.getByRole("heading", {
      name: "CFM56-7B engines for Boeing 737 NG",
      exact: true,
    }),
  ).toBeVisible();
  await expect(page.getByRole("status")).not.toHaveText("0 products");
  await page.getByLabel("Search this section").fill("no-such-product");
  await expect(
    page.getByText(
      "No products match your search. Try another term or clear the filters.",
    ),
  ).toBeVisible();
  await page.getByRole("button", { name: "Clear filters" }).click();
  await expect(page.getByRole("status")).toHaveText("67 products");
});

test("information links expose the supplied contact and order details", async ({
  page,
}) => {
  await page.goto("/");
  await page
    .getByRole("navigation", { name: "Shop information" })
    .getByRole("link", { name: "Contact us" })
    .click();
  await expect(
    page.getByRole("link", { name: "mdruz144@gmail.com" }),
  ).toHaveAttribute("href", "mailto:mdruz144@gmail.com");
  await expect(
    page.getByRole("link", { name: "WhatsApp: +79286253005" }),
  ).toHaveAttribute("href", "https://wa.me/79286253005");
  await page
    .getByRole("navigation", { name: "Shop information" })
    .getByRole("link", { name: "Payment and shipping" })
    .click();
  await expect(page.getByText("I accept PayPal.")).toBeVisible();
  await expect(page.getByText(/for the first kit/)).toContainText("12,00");
  await page
    .getByRole("navigation", { name: "Shop information" })
    .getByRole("link", { name: "Discount", exact: true })
    .click();
  await expect(page.getByText("5% off")).toBeVisible();
  await page
    .getByRole("navigation", { name: "Shop information" })
    .getByRole("link", { name: "Useful links" })
    .click();
  await expect(
    page.getByRole("link", { name: /How to fit a pylon/ }),
  ).toHaveAttribute(
    "href",
    "https://airlinercafe.com/forums/topic/how-to-fit-a-pylon-to-a-wing-the-final-revision/",
  );
});

test("order estimate includes shipping and multi-kit discount in submission", async ({
  page,
}) => {
  await addKit(page);
  const estimate = page.getByRole("region", { name: "Order estimate" });
  await expect(estimate).toContainText("Trackable airmail shipping: 12,00");
  await expect(estimate).not.toContainText("Multi-kit discount");
  await page.getByRole("button", { name: "Increase amount" }).click();
  await expect(estimate).toContainText("Trackable airmail shipping: 16,00");
  await expect(estimate).toContainText("Multi-kit discount (5%)");
  await fillDetails(page);
  await page.route(endpoint, async (route) => {
    const body = route.request().postDataJSON();
    expect(body.itemsCount).toBe(2);
    expect(body.shippingEur).toBe(16);
    expect(body.subtotalEur).toBe(48);
    expect(body.discountEur).toBe(2.4);
    expect(body.estimatedTotalEur).toBe(61.6);
    expect(body.paymentMethod).toBe("PayPal");
    await route.fulfill({ status: 200, body: "{}" });
  });
  await page.getByRole("button", { name: "Place order" }).click();
  await expect(page.getByText(/Order sent/)).toBeVisible();
});
