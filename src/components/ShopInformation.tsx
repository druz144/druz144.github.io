import { Anchor, Stack, Text } from "@mantine/core";
import { shop } from "../data/shop";
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
            Trackable international airmail shipping:{" "}
            {priceFormatter.format(shop.shippingFirstEur)} for the first kit.
          </Text>
          <Text>
            Each additional kit: +
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
            Available on orders of {shop.discountMinimum} or more kits.
          </Text>
          <Text size="sm" c="dimmed">
            Applied to kit prices before shipping.
          </Text>
        </Stack>
      );
    case "/useful-links":
      return (
        <Anchor
          href="https://airlinercafe.com/forums/topic/how-to-fit-a-pylon-to-a-wing-the-final-revision/"
          target="_blank"
          rel="noopener noreferrer"
        >
          How to fit a pylon to a wing — the final revision (Airliner Cafe)
        </Anchor>
      );
    default:
      return null;
  }
}
