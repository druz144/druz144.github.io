import {
  ActionIcon,
  Anchor,
  Button,
  Card,
  Group,
  Text,
  Title,
} from "@mantine/core";
import {
  IconMinus,
  IconPlus,
  IconPhotoOff,
  IconArrowUpRight,
} from "@tabler/icons-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "../../cart/useCart";
import { getKitImageUrl, type Kit } from "../../data/kits";
import { priceFormatter } from "../../utils/format";
import { KitManufacturerName } from "../KitManufacturerName";
import classes from "./KitCard.module.css";

export function KitCard({ kit }: { kit: Kit }) {
  const location = useLocation();
  const fromCatalog =
    location.pathname === "/products"
      ? `${location.pathname}${location.search}`
      : undefined;
  const imageUrl = kit.images[0] ? getKitImageUrl(kit.images[0]) : undefined;
  const [imageFailed, setImageFailed] = useState(false);
  const detailsTo = `/products/${kit.id}`;
  const { getAmount, addItem, incrementItem, decrementItem } = useCart();
  const amount = getAmount(kit.id);
  return (
    <Card
      id={kit.id}
      className={classes.card}
      withBorder
      radius="sm"
      padding={0}
    >
      <Link
        to={detailsTo}
        state={{ fromCatalog }}
        className={`${classes.imageWrap} ${!imageUrl || imageFailed ? classes.withoutImage : ""}`}
        aria-label={`View details for ${kit.name}`}
      >
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
            <IconPhotoOff size={25} stroke={1} />
            <Text size="xs">Photo not available</Text>
          </div>
        )}
        <span className={classes.scale}>{kit.scale}</span>
        <IconArrowUpRight size={18} className={classes.imageArrow} />
      </Link>
      <div className={classes.info}>
        <Text className={classes.type}>
          {kit.type
            ? `${kit.type} ${kit.type === "engine" ? "kit" : "parts"}`
            : "Detail parts"}
        </Text>
        <Title order={2} size="h4" className={classes.title}>
          <Anchor
            component={Link}
            to={detailsTo}
            state={{ fromCatalog }}
            underline="hover"
            inherit
            c="inherit"
          >
            {kit.name}
          </Anchor>
        </Title>
        <Text c="dimmed" size="xs" mt={6}>
          {kit.planeManufacturer} {kit.planeModel}
        </Text>
        <Text size="xs" className={classes.compatibility}>
          {kit.kitManufacturer ? (
            <>
              For <KitManufacturerName name={kit.kitManufacturer} /> kits
            </>
          ) : (
            "Check base-kit compatibility before ordering"
          )}
        </Text>
        <Group justify="space-between" gap="xs" className={classes.bottom}>
          <Text fw={650} size="lg">
            {typeof kit.priceEur === "number" ? (
              priceFormatter.format(kit.priceEur)
            ) : (
              <Text span size="sm" c="dimmed">
                Price on request
              </Text>
            )}
          </Text>
          {amount === 0 ? (
            <Button
              variant="light"
              size="sm"
              onClick={() => addItem(kit.id, 1)}
            >
              Add to cart
            </Button>
          ) : (
            <Group
              gap={5}
              wrap="nowrap"
              aria-label={`Quantity for ${kit.name}`}
            >
              <ActionIcon
                variant="default"
                onClick={() => decrementItem(kit.id)}
                aria-label="Decrease amount"
              >
                <IconMinus size={16} />
              </ActionIcon>
              <Text size="sm" fw={600} ta="center" miw={24} aria-live="polite">
                {amount}
              </Text>
              <ActionIcon
                variant="default"
                onClick={() => incrementItem(kit.id)}
                aria-label="Increase amount"
              >
                <IconPlus size={16} />
              </ActionIcon>
            </Group>
          )}
        </Group>
      </div>
    </Card>
  );
}
