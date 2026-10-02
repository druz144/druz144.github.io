export const shop = {
  name: "Sergey Druz",
  email: "mdruz144@gmail.com",
  whatsapp: "+79286253005",
  instagram: "https://www.instagram.com/druz144/",
  shippingFirstEur: 12,
  shippingAdditionalEur: 4,
  discountRate: 0.05,
  discountMinimum: 2,
};

export const informationLinks = [
  { label: "Contact us", href: "/contact" },
  { label: "Payment and shipping", href: "/payment-shipping" },
  { label: "Discount", href: "/discount" },
  { label: "Useful links", href: "/useful-links" },
];

export function orderEstimate(subtotalEur: number, count: number) {
  const subtotalCents = Math.round(subtotalEur * 100);
  const discountCents =
    count >= shop.discountMinimum
      ? Math.round(subtotalCents * shop.discountRate)
      : 0;
  const shippingEur =
    count > 0
      ? shop.shippingFirstEur + (count - 1) * shop.shippingAdditionalEur
      : 0;
  return {
    discountEur: discountCents / 100,
    shippingEur,
    totalEur: (subtotalCents - discountCents) / 100 + shippingEur,
  };
}
