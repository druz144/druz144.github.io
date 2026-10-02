import { describe, expect, test } from "vitest";
import { orderEstimate } from "../src/data/shop";

describe("order estimates", () => {
  test.each([
    { subtotal: 0, count: 0, discountEur: 0, shippingEur: 0, totalEur: 0 },
    { subtotal: 24, count: 1, discountEur: 0, shippingEur: 12, totalEur: 36 },
    {
      subtotal: 48,
      count: 2,
      discountEur: 2.4,
      shippingEur: 16,
      totalEur: 61.6,
    },
    {
      subtotal: 77,
      count: 3,
      discountEur: 3.85,
      shippingEur: 20,
      totalEur: 93.15,
    },
  ])(
    "calculates shipping and discounts for $count kits",
    ({ subtotal, count, ...expected }) => {
      expect(orderEstimate(subtotal, count)).toEqual(expected);
    },
  );

  test("rounds the discount to cents before calculating the total", () => {
    expect(orderEstimate(24.99, 2)).toEqual({
      discountEur: 1.25,
      shippingEur: 16,
      totalEur: 39.74,
    });
  });
});
