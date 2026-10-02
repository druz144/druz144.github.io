import {
  ActionIcon,
  Alert,
  Anchor,
  Badge,
  Button,
  Container,
  Group,
  Modal,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconArrowLeft,
  IconChevronLeft,
  IconChevronRight,
  IconExternalLink,
  IconMinus,
  IconPlus,
  IconShoppingCartPlus,
} from "@tabler/icons-react";
import { useCallback, useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { useCart } from "../cart/useCart";
import { KitManufacturerBadge } from "../components/KitManufacturerBadge";
import { KitManufacturerName } from "../components/KitManufacturerName";
import { getKitImageUrl, kitsById } from "../data/kits";
import { manualLabel, priceFormatter } from "../utils/format";
import classes from "./KitDetails.module.css";

export function KitDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const fromCatalog = location.state?.fromCatalog;
  const backTo =
    typeof fromCatalog === "string" && /^\/products(?:\?|$)/.test(fromCatalog)
      ? fromCatalog
      : "/products";
  const kit = id && Object.hasOwn(kitsById, id) ? kitsById[id] : undefined;

  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [lightboxOpened, lightbox] = useDisclosure(false);

  const { getAmount, addItem, incrementItem, decrementItem } = useCart();
  const amount = kit ? getAmount(kit.id) : 0;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [id]);

  const imagesCount = kit?.images.length ?? 0;

  const showImage = useCallback(
    (index: number) => {
      if (imagesCount === 0) return;
      const next = ((index % imagesCount) + imagesCount) % imagesCount;
      setLightboxIndex(next);
    },
    [imagesCount],
  );

  const openLightbox = useCallback(
    (index: number) => {
      showImage(index);
      lightbox.open();
    },
    [showImage, lightbox],
  );

  useEffect(() => {
    if (!lightboxOpened) return;
    const handler = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        event.preventDefault();
        showImage(lightboxIndex + 1);
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        showImage(lightboxIndex - 1);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightboxOpened, lightboxIndex, showImage]);

  if (!kit) {
    return (
      <Container size="md" py="xl">
        <Stack gap="md" align="flex-start">
          <Alert color="yellow" variant="light">
            Kit not found.
          </Alert>
          <Button
            component={Link}
            to="/products"
            variant="light"
            leftSection={<IconArrowLeft size={16} stroke={1.5} />}
          >
            Back to products
          </Button>
        </Stack>
      </Container>
    );
  }

  const lightboxImage = kit.images[lightboxIndex];
  const lightboxImageUrl = lightboxImage
    ? getKitImageUrl(lightboxImage)
    : undefined;

  return (
    <Container size="lg" className="page">
      <Group mb="md">
        <Button
          variant="subtle"
          size="xs"
          leftSection={<IconArrowLeft size={16} stroke={1.5} />}
          component={Link}
          to={backTo}
        >
          Back to products
        </Button>
      </Group>

      <div className={classes.productLayout}>
        <div className={classes.info}>
          <Text className="eyebrow">
            {kit.type === "engine" ? "Engine kit" : "Airliner detail parts"} ·{" "}
            {kit.scale}
          </Text>
          <Stack gap={4}>
            <Group gap="md" align="baseline">
              <Title
                order={1}
                size="h1"
                style={{ lineHeight: 1.2, minWidth: 0 }}
              >
                {kit.name}
              </Title>
              {typeof kit.priceEur === "number" && (
                <Text fw={700} fz="1.75rem" style={{ whiteSpace: "nowrap" }}>
                  {priceFormatter.format(kit.priceEur)}
                </Text>
              )}
              {kit.priceEur == null && <Text c="dimmed">Price on request</Text>}
            </Group>
            <Text c="dimmed" size="lg">
              {kit.planeManufacturer} {kit.planeModel}
            </Text>
          </Stack>

          <Group gap="xs" align="center" wrap="wrap">
            {kit.type && (
              <Badge color="gray" variant="light" size="lg" tt="capitalize">
                {kit.type}
              </Badge>
            )}
            <Badge color="gray" variant="light" size="lg">
              {kit.scale}
            </Badge>
            {kit.kitManufacturer && (
              <KitManufacturerBadge name={kit.kitManufacturer} size="lg" />
            )}
          </Group>

          {kit.manuals && kit.manuals.length > 0 && (
            <Group gap="xs" wrap="wrap">
              <Text size="md" c="dimmed">
                Build guide:
              </Text>
              {kit.manuals.map((manual) => (
                <Anchor
                  key={manual.url}
                  href={manual.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  size="md"
                >
                  <Group gap={4} wrap="nowrap">
                    {manualLabel(manual)}
                    <IconExternalLink size={14} stroke={1.5} />
                  </Group>
                </Anchor>
              ))}
            </Group>
          )}

          {kit.description && <Text size="sm">{kit.description}</Text>}

          <div className={classes.compatibility}>
            <Text fw={600} size="sm">
              Before you order
            </Text>
            <Text size="sm" c="dimmed" mt={6}>
              {kit.kitManufacturer ? (
                <>
                  Designed for{" "}
                  <KitManufacturerName name={kit.kitManufacturer} /> kits in{" "}
                  {kit.scale} scale.
                </>
              ) : (
                `For ${kit.planeManufacturer} ${kit.planeModel} in ${kit.scale} scale. Contact me to check compatibility with your base kit.`
              )}
            </Text>
            <Anchor component={Link} to="/contact" size="sm">
              Ask about compatibility →
            </Anchor>
          </div>
          <div>
            {amount === 0 ? (
              <Button
                variant="filled"
                size="md"
                leftSection={<IconShoppingCartPlus size={18} stroke={1.5} />}
                onClick={() => addItem(kit.id, 1)}
              >
                Add to cart
              </Button>
            ) : (
              <Group gap={6} wrap="nowrap">
                <ActionIcon
                  variant="default"
                  size="lg"
                  onClick={() => decrementItem(kit.id)}
                  aria-label="Decrease amount"
                >
                  <IconMinus size={16} stroke={1.5} />
                </ActionIcon>
                <Text
                  fw={600}
                  size="lg"
                  ta="center"
                  style={{ minWidth: "2rem" }}
                  aria-live="polite"
                >
                  {amount}
                </Text>
                <ActionIcon
                  variant="default"
                  size="lg"
                  onClick={() => incrementItem(kit.id)}
                  aria-label="Increase amount"
                >
                  <IconPlus size={16} stroke={1.5} />
                </ActionIcon>
              </Group>
            )}
          </div>
          {amount > 0 && (
            <Anchor component={Link} to="/cart" size="sm">
              View your cart →
            </Anchor>
          )}
          <Text size="xs" c="dimmed">
            Shipping is calculated in your cart. Your order and final price will
            be confirmed by email.
          </Text>
        </div>

        {kit.images.length > 0 && (
          <section
            className={classes.gallerySection}
            aria-label="Product photos"
          >
            <div className={classes.galleryGrid}>
              {kit.images.map((src, index) => (
                <button
                  key={src}
                  type="button"
                  className={classes.galleryItem}
                  onClick={() => openLightbox(index)}
                  aria-label={`Open ${kit.name} image ${index + 1} of ${kit.images.length}`}
                >
                  <img
                    src={getKitImageUrl(src)}
                    alt={`${kit.name} — image ${index + 1}`}
                    loading="lazy"
                    className={classes.galleryImage}
                  />
                </button>
              ))}
            </div>
            <Text size="xs" c="dimmed" mt="sm">
              Select a photo to enlarge it.
            </Text>
          </section>
        )}
        {kit.images.length === 0 && (
          <div className={classes.noPhoto}>
            <Text fw={600}>Product photos are not available yet.</Text>
            <Text size="sm" c="dimmed" mt="xs">
              Contact me if you would like more information about this kit.
            </Text>
          </div>
        )}
      </div>

      <Modal
        opened={lightboxOpened}
        onClose={lightbox.close}
        size="xl"
        centered
        withCloseButton
        title={`${kit.name} — image ${lightboxIndex + 1} of ${kit.images.length}`}
        padding="sm"
      >
        <div className={classes.lightboxBody}>
          {lightboxImageUrl && (
            <img
              src={lightboxImageUrl}
              alt={`${kit.name} — image ${lightboxIndex + 1}`}
              className={classes.lightboxImage}
            />
          )}
          {kit.images.length > 1 && (
            <Group justify="space-between" mt="sm">
              <Button
                variant="subtle"
                size="xs"
                leftSection={<IconChevronLeft size={16} stroke={1.5} />}
                onClick={() => showImage(lightboxIndex - 1)}
              >
                Previous
              </Button>
              <Button
                variant="subtle"
                size="xs"
                rightSection={<IconChevronRight size={16} stroke={1.5} />}
                onClick={() => showImage(lightboxIndex + 1)}
              >
                Next
              </Button>
            </Group>
          )}
        </div>
      </Modal>
    </Container>
  );
}
