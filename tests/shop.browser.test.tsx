import { MantineProvider } from "@mantine/core";
import { createHashRouter, RouterProvider } from "react-router-dom";
import { afterEach, beforeEach, expect, test, vi } from "vitest";
import { page, userEvent } from "vitest/browser";
import { cleanup, render } from "vitest-browser-react/pure";
import { routes } from "../src/routes";
import { cssVariablesResolver, theme } from "../src/theme";

const key = "druz144.cart.v1";
const endpoint = "https://formspree.io/f/xvzlawdw";
const viewport = { width: window.innerWidth, height: window.innerHeight };
const checkout = vi.fn<typeof fetch>();
let router: ReturnType<typeof createHashRouter> | undefined;

async function mount(route = window.location.hash.slice(1) || "/") {
  await cleanup();
  router?.dispose();
  window.history.replaceState(null, "", `#${route}`);
  router = createHashRouter(routes);
  await render(
    <MantineProvider
      theme={theme}
      defaultColorScheme="auto"
      cssVariablesResolver={cssVariablesResolver}
    >
      <RouterProvider router={router} />
    </MantineProvider>,
  );
  await expect.element(page.getByRole("main")).toBeVisible();
  window.scrollTo(0, 0);
}

beforeEach(async () => {
  localStorage.clear();
  await page.viewport(viewport.width, viewport.height);
  checkout.mockReset().mockRejectedValue(new Error("Unexpected order request"));
  const originalFetch = window.fetch.bind(window);
  vi.spyOn(window, "fetch").mockImplementation((input, init) => {
    const url = input instanceof Request ? input.url : String(input);
    return url === endpoint
      ? checkout(input, init)
      : originalFetch(input, init);
  });
});

afterEach(async () => {
  await cleanup();
  router?.dispose();
  router = undefined;
  vi.restoreAllMocks();
  localStorage.clear();
});

async function addKit() {
  await mount("/products");
  await page.getByRole("button", { name: "Add to cart" }).first().click();
  await page
    .getByRole("banner")
    .getByRole("link", { name: "Cart", exact: true })
    .click();
  await expect
    .element(page.getByRole("heading", { name: "Items (1)" }))
    .toBeVisible();
}

async function fillDetails() {
  await page
    .getByRole("textbox", { name: "Name", exact: true })
    .fill("Test Customer");
  await page.getByRole("textbox", { name: "Email" }).fill("test@example.com");
  await page.getByRole("textbox", { name: "Country" }).fill("Germany");
}

function submittedOrder() {
  expect(checkout).toHaveBeenCalledWith(
    endpoint,
    expect.objectContaining({ method: "POST" }),
  );
  return JSON.parse(String(checkout.mock.lastCall?.[1]?.body));
}

test("home carousel cycles through three product types and opens the selected product", async () => {
  await mount("/");
  const carousel = page.getByRole("region", { name: "From the workbench" });
  const engines = carousel.getByRole("button", { name: "Show engines" });
  const winglets = carousel.getByRole("button", { name: "Show winglets" });
  const nose = carousel.getByRole("button", { name: "Show nose sections" });
  const next = carousel.getByRole("button", { name: "Next product" });
  await expect.element(engines).toHaveAttribute("aria-pressed", "true");
  await expect
    .element(carousel.getByRole("link"))
    .toHaveAttribute("href", "#/products/cfm56-7b_revell");
  await next.click();
  await expect.element(winglets).toHaveAttribute("aria-pressed", "true");
  await expect
    .element(carousel.getByRole("link"))
    .toHaveAttribute("href", "#/products/winglets_b737_revell");
  await next.click();
  await expect.element(nose).toHaveAttribute("aria-pressed", "true");
  await expect
    .element(carousel.getByRole("link"))
    .toHaveAttribute("href", "#/products/nose_b747");
  await next.click();
  await expect.element(engines).toHaveAttribute("aria-pressed", "true");
  await carousel.getByRole("button", { name: "Previous product" }).click();
  await expect.element(nose).toHaveAttribute("aria-pressed", "true");
  await engines.click();
  await expect.element(engines).toHaveAttribute("aria-pressed", "true");
  await userEvent.keyboard("{ArrowRight}");
  await expect.element(winglets).toHaveAttribute("aria-pressed", "true");
  await carousel.getByRole("link").click();
  await expect
    .element(page.getByRole("heading", { level: 1 }))
    .toHaveTextContent("Winglets for Boeing 737 Classic/NG");
});

test("cart quantities persist across navigation and app remounts", async () => {
  await addKit();
  await page.getByRole("button", { name: "Increase amount" }).click();
  await expect
    .element(page.getByRole("heading", { name: "Items (2)" }))
    .toBeVisible();
  await mount();
  await expect
    .element(page.getByRole("heading", { name: "Items (2)" }))
    .toBeVisible();
  await page.getByRole("button", { name: "Decrease amount" }).click();
  await page.getByRole("button", { name: /^Remove .* from cart$/ }).click();
  await expect.element(page.getByText("Your cart is empty.")).toBeVisible();
  await expect
    .element(page.getByRole("button", { name: "Send order request" }))
    .toBeDisabled();
});

test("carousel keyboard navigation keeps focus on a visible control", async () => {
  await mount("/");
  const carousel = page.getByRole("region", { name: "From the workbench" });
  carousel.getByRole("link").element().focus();
  await userEvent.keyboard("{ArrowRight}");
  const winglets = carousel.getByRole("button", { name: "Show winglets" });
  await expect.element(winglets).toHaveAttribute("aria-pressed", "true");
  await expect.element(winglets).toHaveFocus();
  expect(document.activeElement?.closest('[aria-hidden="true"]')).toBeNull();
});

test("checkout validates required details without sending an order", async () => {
  await addKit();
  await page.getByRole("button", { name: "Send order request" }).click();
  await expect.element(page.getByText("Name is required")).toBeVisible();
  await expect
    .element(page.getByText("Enter a valid email address"))
    .toBeVisible();
  await expect.element(page.getByText("Country is required")).toBeVisible();
  expect(checkout).not.toHaveBeenCalled();
  await expect
    .element(page.getByRole("heading", { name: "Items (1)" }))
    .toBeVisible();
});

test("invalid stored items and prototype product IDs do not crash", async () => {
  localStorage.setItem(
    key,
    JSON.stringify([
      { id: "constructor", amount: 1 },
      { id: "__proto__", amount: 2 },
      { id: "missing", amount: 1 },
      { id: "cfm56-7b_revell", amount: { valueOf: 1, toString: 1 } },
    ]),
  );
  await mount("/cart");
  await expect.element(page.getByText("Your cart is empty.")).toBeVisible();
  await mount("/products/constructor");
  await expect
    .element(page.getByRole("heading", { level: 1, name: "Kit not found." }))
    .toBeVisible();
});

test("failed checkout preserves the cart and supports retry", async () => {
  await addKit();
  await fillDetails();
  checkout.mockResolvedValueOnce(new Response("{}", { status: 500 }));
  await page.getByRole("button", { name: "Send order request" }).click();
  await expect
    .element(page.getByText("Something went wrong. Please try again."))
    .toBeVisible();
  await expect
    .element(page.getByRole("heading", { name: "Items (1)" }))
    .toBeVisible();
  await expect
    .element(page.getByRole("textbox", { name: "Name", exact: true }))
    .toHaveValue("Test Customer");
  checkout.mockResolvedValueOnce(new Response("{}", { status: 200 }));
  await page.getByRole("button", { name: "Send order request" }).click();
  await expect.element(page.getByText(/Order sent/)).toBeVisible();
  expect(submittedOrder()).toMatchObject({
    email: "test@example.com",
    itemsCount: 1,
    items: [expect.objectContaining({ id: "cfm56-7b_revell", amount: 1 })],
  });
  await expect.element(page.getByText("Your cart is empty.")).toBeVisible();
});

test("checkout retains quantities added while sending", async () => {
  await addKit();
  await fillDetails();
  let resolveRequest!: (response: Response) => void;
  const pending = new Promise<Response>((resolve) => {
    resolveRequest = resolve;
  });
  checkout.mockReturnValueOnce(pending);
  await page.getByRole("button", { name: "Send order request" }).click();
  await expect.poll(() => checkout.mock.calls.length).toBe(1);
  await page.getByRole("button", { name: "Increase amount" }).click();
  resolveRequest(new Response("{}", { status: 200 }));
  await expect.element(page.getByText(/Order sent/)).toBeVisible();
  await expect
    .element(page.getByRole("heading", { name: "Items (1)" }))
    .toBeVisible();
});

test("gallery opens and supports keyboard navigation", async () => {
  await mount("/products/cfm56-7b_revell");
  await page.getByRole("button", { name: /Open .* image 1 of/ }).click();
  await expect.element(page.getByRole("dialog")).toBeVisible();
  await expect
    .element(page.getByRole("button", { name: "Close product photos" }))
    .toBeVisible();
  await userEvent.keyboard("{ArrowRight}");
  await expect
    .element(page.getByRole("dialog"))
    .toHaveAccessibleName(/image 2 of/);
  await userEvent.keyboard("{Escape}");
  await expect.element(page.getByRole("dialog")).not.toBeInTheDocument();
});

test("category filters survive remounts and reset dependent filters", async () => {
  await mount("/");
  await page
    .getByRole("navigation", { name: "Product categories" })
    .getByRole("link", { name: "Airbus", exact: true })
    .click();
  await expect
    .element(page.getByLabelText("Scale", { exact: true }))
    .toHaveValue("1/144");
  await expect
    .element(page.getByLabelText("Aircraft manufacturer"))
    .toHaveValue("Airbus");
  await expect
    .element(page.getByRole("heading", { level: 2, name: /Boeing/ }))
    .not.toBeInTheDocument();
  await expect
    .element(page.getByText("Airbus A319/320/321", { exact: true }).first())
    .toBeVisible();
  await mount();
  await expect
    .element(page.getByLabelText("Aircraft manufacturer"))
    .toHaveValue("Airbus");
  await page.getByLabelText("Scale", { exact: true }).selectOptions("1/200");
  await expect
    .element(page.getByLabelText("Aircraft manufacturer"))
    .not.toBeInTheDocument();
  await expect
    .element(page.getByRole("status"))
    .toHaveTextContent("5 products");
  await page
    .getByRole("link", { name: "3D models (STL files) 1/72", exact: true })
    .click();
  await expect
    .element(page.getByText("No STL files are listed yet."))
    .toBeVisible();
  await page
    .getByRole("navigation", { name: "Product categories" })
    .getByRole("link", { name: "Aircraft kits", exact: true })
    .click();
  await expect
    .element(page.getByText("No aircraft kits are listed yet."))
    .toBeVisible();
  await page
    .getByRole("navigation", { name: "Product categories" })
    .getByRole("link", { name: "In progress", exact: true })
    .click();
  await expect
    .element(page.getByText("Project updates will appear here."))
    .toBeVisible();
});

test("selected aircraft and scale filters toggle off without clearing the search", async () => {
  await mount(
    "/products?category=parts&scale=1%2F144&manufacturer=Boeing&q=engines&page=2",
  );
  const navigation = page.getByRole("navigation", {
    name: "Product categories",
  });
  const boeing = navigation.getByRole("link", { name: "Boeing", exact: true });
  const scale = navigation.getByRole("link", {
    name: "Engine kits and parts 1/144",
    exact: true,
  });

  await expect.element(boeing).toHaveAttribute("aria-current", "page");
  await boeing.click();
  await expect
    .element(page.getByLabelText("Aircraft manufacturer"))
    .toHaveValue("");
  await expect.element(boeing).not.toHaveAttribute("aria-current");
  await expect.element(scale).toHaveAttribute("aria-current", "page");
  await expect
    .element(page.getByLabelText("Search this section"))
    .toHaveValue("engines");
  expect(
    new URLSearchParams(window.location.hash.split("?")[1]).has("page"),
  ).toBe(false);

  await boeing.click();
  await expect
    .element(page.getByLabelText("Aircraft manufacturer"))
    .toHaveValue("Boeing");
  await scale.click();
  await expect
    .element(page.getByLabelText("Scale", { exact: true }))
    .toHaveValue("");
  await expect
    .element(page.getByLabelText("Aircraft manufacturer"))
    .not.toBeInTheDocument();
  await expect.element(scale).not.toHaveAttribute("aria-current");
  await expect.element(boeing).not.toHaveAttribute("aria-current");
  expect(
    new URLSearchParams(window.location.hash.split("?")[1]).has("manufacturer"),
  ).toBe(false);
  await mount();
  await expect
    .element(page.getByLabelText("Scale", { exact: true }))
    .toHaveValue("");
  await expect
    .element(page.getByLabelText("Search this section"))
    .toHaveValue("engines");

  await scale.click();
  await expect
    .element(page.getByLabelText("Scale", { exact: true }))
    .toHaveValue("1/144");
  await navigation
    .getByRole("link", { name: "Engine kits and parts 1/200", exact: true })
    .click();
  await expect
    .element(page.getByLabelText("Scale", { exact: true }))
    .toHaveValue("1/200");
});

test("selected STL scales toggle off within their own category", async () => {
  await mount("/products?category=models&scale=1%2F72");
  const scale = page.getByRole("link", {
    name: "3D models (STL files) 1/72",
    exact: true,
  });
  await scale.click();
  await expect
    .element(page.getByLabelText("Scale", { exact: true }))
    .toHaveValue("");
  await expect.element(scale).not.toHaveAttribute("aria-current");
  await expect
    .element(page.getByRole("heading", { level: 1 }))
    .toHaveTextContent("3D models (STL files)");
  await scale.click();
  await expect
    .element(page.getByLabelText("Scale", { exact: true }))
    .toHaveValue("1/72");
});

test("header search finds kits and handles no results", async () => {
  await mount("/");
  await page
    .getByRole("searchbox", { name: "Search products" })
    .fill("CFM56 Revell");
  await page.getByRole("button", { name: "Search", exact: true }).click();
  await expect
    .element(
      page.getByRole("heading", {
        name: "CFM56-7B engines for Boeing 737 NG",
        exact: true,
      }),
    )
    .toBeVisible();
  await page.getByLabelText("Search this section").fill("no-such-product");
  await expect
    .element(
      page.getByText(
        "No products match your search. Try another term or clear the filters.",
      ),
    )
    .toBeVisible();
  await page.getByRole("button", { name: "Clear filters" }).click();
  await expect
    .element(page.getByRole("status"))
    .toHaveTextContent("68 products");
});

test("information navigation exposes contact and order details", async () => {
  await mount("/");
  const footer = page.getByRole("contentinfo");
  for (const [name, href] of [
    ["Home", "#/"],
    ["Products", "#/products"],
    ["Contact", "#/contact"],
    ["Cart", "#/cart"],
    ["Payment and shipping", "#/payment-shipping"],
    ["Discount", "#/discount"],
    ["Useful links", "#/useful-links"],
  ]) {
    await expect
      .element(footer.getByRole("link", { name, exact: true }))
      .toHaveAttribute("href", href);
  }
  const navigation = page.getByRole("navigation", { name: "Shop information" });
  await expect
    .element(navigation.getByRole("link", { name: "Contact us" }))
    .not.toBeInTheDocument();
  await expect
    .element(footer.getByRole("navigation", { name: "Useful links" }))
    .not.toBeInTheDocument();
  await page
    .getByRole("navigation", { name: "Main navigation" })
    .getByRole("link", { name: "Contact", exact: true })
    .click();
  await expect
    .element(page.getByRole("link", { name: "mdruz144@gmail.com" }))
    .toHaveAttribute("href", "mailto:mdruz144@gmail.com");
  await expect
    .element(page.getByRole("link", { name: "WhatsApp: +79286253005" }))
    .toHaveAttribute("href", "https://wa.me/79286253005");
  const goodToKnow = page
    .getByRole("navigation", { name: "Main navigation" })
    .getByRole("link", { name: "Good to know" });
  await goodToKnow.click();
  await expect.element(goodToKnow).toHaveAttribute("aria-current", "page");
  await expect
    .element(
      page
        .getByRole("navigation", { name: "Information topics" })
        .getByRole("link", { name: "Contact us" }),
    )
    .not.toBeInTheDocument();
  await expect.element(page.getByText("I accept PayPal.")).toBeVisible();
  await expect
    .element(page.getByText(/for the first kit/))
    .toMatchTextContent(/€12\.00/);
  await navigation.getByRole("link", { name: "Discount", exact: true }).click();
  await expect.element(page.getByText("5% off")).toBeVisible();
  await expect.element(goodToKnow).toHaveAttribute("aria-current", "location");
  await page
    .getByRole("navigation", { name: "Information topics" })
    .getByRole("link", { name: "Useful links" })
    .click();
  await expect.element(goodToKnow).toHaveAttribute("aria-current", "location");
  await expect
    .element(
      page.getByRole("main").getByRole("link", { name: /How to fit a pylon/ }),
    )
    .toHaveAttribute(
      "href",
      "https://airlinercafe.com/forums/topic/how-to-fit-a-pylon-to-a-wing-the-final-revision/",
    );
});

test("order submission includes shipping and the multi-kit discount", async () => {
  await addKit();
  const estimate = page.getByRole("region", { name: "Order estimate" });
  await expect
    .element(estimate)
    .toMatchTextContent(/Tracked airmail shipping: €12\.00/);
  await expect.element(estimate).not.toMatchTextContent(/Multi-kit discount/);
  await page.getByRole("button", { name: "Increase amount" }).click();
  await expect
    .element(estimate)
    .toMatchTextContent(/Tracked airmail shipping: €16\.00/);
  await expect
    .element(estimate)
    .toMatchTextContent(/Multi-kit discount \(5%\)/);
  await fillDetails();
  checkout.mockResolvedValueOnce(new Response("{}", { status: 200 }));
  await page.getByRole("button", { name: "Send order request" }).click();
  await expect.element(page.getByText(/Order sent/)).toBeVisible();
  expect(submittedOrder()).toMatchObject({
    itemsCount: 2,
    shippingEur: 16,
    subtotalEur: 48,
    discountEur: 2.4,
    estimatedTotalEur: 61.6,
    paymentMethod: "PayPal",
  });
});

test("pagination and product back links preserve catalog context", async () => {
  await mount("/products?category=parts&scale=1%2F144");
  await expect
    .poll(() => page.getByRole("heading", { level: 2 }).elements().length)
    .toBe(12);
  await expect
    .element(page.getByRole("button", { name: "Previous page" }))
    .toBeDisabled();
  await page.getByRole("button", { name: "Next page", exact: true }).click();
  await expect.element(page.getByText("Showing 13–24 of 63")).toBeVisible();
  const firstTitle = page
    .getByRole("heading", { level: 2 })
    .first()
    .element().textContent!;
  await page
    .getByRole("heading", { level: 2 })
    .first()
    .getByRole("link")
    .click();
  await expect
    .element(page.getByRole("heading", { level: 1 }))
    .toHaveTextContent(firstTitle);
  await page.getByRole("link", { name: "Back to products" }).click();
  await expect.poll(() => window.location.hash).toContain("page=2");
  await expect
    .element(page.getByRole("heading", { level: 2 }).first())
    .toHaveTextContent(firstTitle);
  await mount();
  await expect
    .element(page.getByRole("heading", { level: 2 }).first())
    .toHaveTextContent(firstTitle);
  await page.getByLabelText("Search this section").fill("CFM56");
  await expect.poll(() => window.location.hash).not.toContain("page=2");
  await expect
    .element(page.getByRole("status"))
    .not.toHaveTextContent("0 products");
});

test.each(["light", "dark"])(
  "pages fit narrow screens in %s mode",
  async (scheme) => {
    await page.viewport(320, 740);
    localStorage.setItem("mantine-color-scheme-value", scheme);
    localStorage.setItem(
      key,
      JSON.stringify([
        { id: "cfm56-7b_revell", amount: 1 },
        { id: "fans_spinners_cf6-80c2", amount: 1 },
      ]),
    );
    for (const route of [
      "/",
      "/products",
      "/products?category=parts&scale=1%2F144&manufacturer=Airbus",
      "/products/cfm56-3_b737",
      "/cart",
      "/contact",
      "/payment-shipping",
    ]) {
      await mount(route);
      await expect
        .element(page.getByRole("heading", { level: 1 }))
        .toBeVisible();
      expect(document.documentElement.dataset.mantineColorScheme).toBe(scheme);
      expect(document.documentElement.scrollWidth, route).toBeLessThanOrEqual(
        320,
      );
      const cart = page
        .getByRole("banner")
        .getByRole("link", { name: "Cart", exact: true })
        .element()
        .getBoundingClientRect();
      expect(cart.left, route).toBeGreaterThanOrEqual(0);
      expect(cart.right, route).toBeLessThanOrEqual(320);
      expect(cart.top, route).toBeGreaterThanOrEqual(0);
      expect(cart.bottom, route).toBeLessThanOrEqual(740);
    }
  },
);

test("keyboard skip link and missing routes provide usable navigation", async () => {
  await mount("/");
  await expect.element(page.getByRole("heading", { level: 1 })).toBeVisible();
  await userEvent.tab();
  await expect
    .element(page.getByRole("link", { name: "Skip to content" }))
    .toHaveFocus();
  await userEvent.keyboard("{Enter}");
  await expect.element(page.getByRole("main")).toHaveFocus();
  await mount("/missing-page");
  await expect
    .element(page.getByRole("heading", { level: 1 }))
    .toHaveTextContent("Let’s get back to the workbench.");
  await page.getByRole("link", { name: "Browse products" }).click();
  await expect
    .element(page.getByRole("heading", { level: 1 }))
    .toHaveTextContent("Engine kits and parts");
});

test("GE90-115 fans and decals are separate products that can be ordered together", async () => {
  await mount("/products?q=GE90-115");
  await expect
    .element(page.getByRole("status"))
    .toHaveTextContent("2 products");
  await expect
    .element(
      page.getByRole("heading", {
        name: "Fans and spinners for GE90-115 engines on Boeing 777-300ER",
        exact: true,
      }),
    )
    .toBeVisible();
  await expect
    .element(
      page.getByRole("heading", {
        name: "Decals for GE90-115 engines on Boeing 777-300ER",
        exact: true,
      }),
    )
    .toBeVisible();
  await page.getByRole("button", { name: "Add to cart" }).first().click();
  await page.getByRole("button", { name: "Add to cart" }).click();
  await page
    .getByRole("banner")
    .getByRole("link", { name: "Cart", exact: true })
    .click();
  await expect
    .element(page.getByRole("heading", { name: "Items (2)" }))
    .toBeVisible();
  await fillDetails();
  checkout.mockResolvedValueOnce(new Response("{}", { status: 200 }));
  await page.getByRole("button", { name: "Send order request" }).click();
  await expect.element(page.getByText(/Order sent/)).toBeVisible();
  expect(submittedOrder()).toMatchObject({
    subtotalEur: 18,
    items: [
      expect.objectContaining({
        id: "fans_spinners_decals_b777",
        unitPriceEur: 9,
        amount: 1,
      }),
      expect.objectContaining({
        id: "decals_ge90-115_b777",
        unitPriceEur: 9,
        amount: 1,
      }),
    ],
  });
});

test("fan dimensions from the product list can be searched and viewed", async () => {
  await mount("/products?q=16.4");
  await expect.element(page.getByRole("status")).toHaveTextContent("1 product");
  await page.getByRole("heading", { level: 2 }).getByRole("link").click();
  await expect.element(page.getByText("Fan diameter: 16.4 mm.")).toBeVisible();
});
