import { Anchor, Stack, Text } from "@mantine/core";
import { shop, usefulLinks } from "../data/shop";
import { priceFormatter } from "../utils/format";

export function ShopInformation({ section }: { section: string }) {
  switch (section) {
    case "/contact":
      return (
        <Stack gap="xs">
          <Text>{shop.name}</Text>
          <Anchor
            href={`mailto:${shop.email}`}
            style={{ overflowWrap: "anywhere" }}
          >
            {shop.email}
          </Anchor>
          <Anchor
            href={`https://wa.me/${shop.whatsapp.slice(1)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp: {shop.whatsapp}
          </Anchor>
          <Anchor
            href={shop.instagram}
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram: @druz144
          </Anchor>
        </Stack>
      );
    case "/payment-shipping":
      return (
        <Stack gap="xs">
          <Text>I accept PayPal.</Text>
          <Text>
            Tracked international airmail:{" "}
            {priceFormatter.format(shop.shippingFirstEur)} for the first kit.
          </Text>
          <Text>
            Each additional kit:{" "}
            {priceFormatter.format(shop.shippingAdditionalEur)}.
          </Text>
        </Stack>
      );
    case "/discount":
      return (
        <Stack gap="xs">
          <Text fw={700} size="xl">
            5% off
          </Text>
          <Text>
            Order {shop.discountMinimum} or more kits and save 5% on the kit
            subtotal.
          </Text>
          <Text size="sm" c="dimmed">
            The discount is included automatically in your cart estimate.
            Shipping is calculated separately.
          </Text>
        </Stack>
      );
    case "/useful-links":
      return (
        <Stack gap="sm">
          {usefulLinks.map((link) => (
            <Anchor
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.label}
            </Anchor>
          ))}
        </Stack>
      );
    default:
      return null;
  }
}
