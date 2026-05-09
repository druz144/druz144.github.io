import {
  ActionIcon,
  Anchor,
  Badge,
  Button,
  Card,
  CopyButton,
  Group,
  Stack,
  Text,
  Title,
  Tooltip,
} from "@mantine/core";
import {
  IconCheck,
  IconExternalLink,
  IconLink,
  IconMinus,
  IconPlus,
  IconShoppingCartPlus,
} from "@tabler/icons-react";
import { useState } from "react";
import { useCart } from "../../cart/useCart";
import { getKitImageUrl, type Kit } from "../../data/kits";
import classes from "./KitCard.module.css";

const priceFormatter = new Intl.NumberFormat("de-DE", {
  style: "currency",
  currency: "EUR",
});

function manualLabel(label: string | undefined, url: string): string {
  if (label && label.trim().length > 0) return label;
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "Manual";
  }
}

type KitCardProps = {
  kit: Kit;
};

export function KitCard({ kit }: KitCardProps) {
  const imageUrl = kit.image ? getKitImageUrl(kit.image) : undefined;
  const [imageFailed, setImageFailed] = useState(false);
  const anchorHref = `#${kit.id}`;
  const { getAmount, addItem, incrementItem, decrementItem } = useCart();
  const amount = getAmount(kit.id);

  return (
    <Card
      id={kit.id}
      className={classes.card}
      withBorder
      radius="md"
      padding="md"
    >
      <div className={classes.body}>
        <div className={classes.imageWrap}>
          {imageUrl && !imageFailed ? (
            <img
              className={classes.image}
              src={imageUrl}
              alt={kit.name}
              loading="lazy"
              onError={() => setImageFailed(true)}
            />
          ) : (
            <div className={classes.placeholder}>
              <Text size="sm">No image</Text>
            </div>
          )}
        </div>

        <div className={classes.info}>
          <Group justify="space-between" align="flex-start" wrap="nowrap">
            <Stack gap={4} style={{ minWidth: 0 }}>
              <Group gap="xs" wrap="wrap" align="center">
                <Title order={3} style={{ lineHeight: 1.2 }}>
                  <Anchor
                    href={anchorHref}
                    underline="never"
                    inherit
                    c="inherit"
                  >
                    {kit.name}
                  </Anchor>
                </Title>
                {kit.type && (
                  <Badge variant="light" radius="sm">
                    {kit.type}
                  </Badge>
                )}
              </Group>
              <Text c="dimmed" size="sm">
                {kit.planeManufacturer} · {kit.planeModel}
              </Text>
            </Stack>

            {typeof kit.priceEur === "number" && (
              <div className={classes.priceCol}>
                <Text fw={700} size="lg">
                  {priceFormatter.format(kit.priceEur)}
                </Text>
              </div>
            )}
          </Group>

          <Group gap="lg" mt="sm" wrap="wrap">
            <Text size="sm">
              <Text span c="dimmed">
                Scale:{" "}
              </Text>
              <Text span fw={500}>
                {kit.scale}
              </Text>
            </Text>
            {kit.kitManufacturer && (
              <Text size="sm">
                <Text span c="dimmed">
                  Kit by:{" "}
                </Text>
                <Text span fw={500}>
                  {kit.kitManufacturer}
                </Text>
              </Text>
            )}
          </Group>

          {kit.manuals && kit.manuals.length > 0 && (
            <Group gap="xs" mt="sm" wrap="wrap">
              <Text size="sm" c="dimmed">
                Manuals:
              </Text>
              {kit.manuals.map((manual) => (
                <Anchor
                  key={manual.url}
                  href={manual.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  size="sm"
                >
                  <Group gap={4} wrap="nowrap">
                    {manualLabel(manual.label, manual.url)}
                    <IconExternalLink size={14} stroke={1.5} />
                  </Group>
                </Anchor>
              ))}
            </Group>
          )}

          <Group justify="space-between" mt="sm" wrap="nowrap">
            {amount === 0 ? (
              <Button
                variant="light"
                size="xs"
                leftSection={<IconShoppingCartPlus size={16} stroke={1.5} />}
                onClick={() => addItem(kit.id, 1)}
              >
                Add to cart
              </Button>
            ) : (
              <Group gap={6} wrap="nowrap" className={classes.stepper}>
                <ActionIcon
                  variant="default"
                  onClick={() => decrementItem(kit.id)}
                  aria-label="Decrease amount"
                >
                  <IconMinus size={16} stroke={1.5} />
                </ActionIcon>
                <Text
                  fw={600}
                  size="sm"
                  ta="center"
                  className={classes.stepperCount}
                  aria-live="polite"
                >
                  {amount}
                </Text>
                <ActionIcon
                  variant="default"
                  onClick={() => incrementItem(kit.id)}
                  aria-label="Increase amount"
                >
                  <IconPlus size={16} stroke={1.5} />
                </ActionIcon>
              </Group>
            )}

            <CopyButton
              value={`${window.location.origin}${window.location.pathname}#${kit.id}`}
              timeout={1500}
            >
              {({ copied, copy }) => (
                <Tooltip
                  label={copied ? "Link copied" : "Copy link"}
                  withArrow
                  position="left"
                >
                  <ActionIcon
                    variant="subtle"
                    onClick={copy}
                    aria-label="Copy link to this kit"
                  >
                    {copied ? (
                      <IconCheck size={16} stroke={1.5} />
                    ) : (
                      <IconLink size={16} stroke={1.5} />
                    )}
                  </ActionIcon>
                </Tooltip>
              )}
            </CopyButton>
          </Group>
        </div>
      </div>
    </Card>
  );
}
