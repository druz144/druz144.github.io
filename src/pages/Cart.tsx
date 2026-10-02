import {
  ActionIcon,
  Alert,
  Anchor,
  Box,
  Button,
  Card,
  Container,
  Divider,
  Group,
  Stack,
  Text,
  Textarea,
  TextInput,
  Title,
  Tooltip,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import {
  IconAlertCircle,
  IconArrowRight,
  IconCheck,
  IconMinus,
  IconPlus,
  IconTrash,
} from "@tabler/icons-react";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../cart/useCart";
import classes from "./Cart.module.css";
import { getKitImageUrl, kitsById } from "../data/kits";
import { orderEstimate } from "../data/shop";
import { priceFormatter } from "../utils/format";

type SubmitState = "idle" | "loading" | "success" | "error";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xvzlawdw";

export function CartPage() {
  const submitting = useRef(false);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const {
    items,
    totalCount,
    incrementItem,
    decrementItem,
    removeItem,
    removeSubmittedItems,
  } = useCart();

  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      country: "",
      message: "",
    },
    validate: {
      name: (value) => (value.trim().length === 0 ? "Name is required" : null),
      email: (value) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
          ? null
          : "Invalid e-mail address",
      country: (value) =>
        value.trim().length === 0 ? "Country is required" : null,
    },
  });

  const lines = items.map((it) => {
    const kit = kitsById[it.id];
    const unitPriceEur = kit?.priceEur ?? null;
    const lineTotalEur = unitPriceEur != null ? unitPriceEur * it.amount : null;
    return {
      id: it.id,
      amount: it.amount,
      kit,
      unitPriceEur,
      lineTotalEur,
    };
  });

  const subtotalEur = lines.reduce(
    (sum, line) => sum + (line.lineTotalEur ?? 0),
    0,
  );
  const {
    discountEur,
    shippingEur,
    totalEur: estimatedTotalEur,
  } = orderEstimate(subtotalEur, totalCount);
  const hasAnyPrice = lines.some((line) => line.lineTotalEur != null);
  const hasMissingPrice = lines.some((line) => line.lineTotalEur == null);

  const isEmpty = items.length === 0;

  const handleSubmit = async (values: typeof form.values) => {
    if (isEmpty || submitting.current) return;
    submitting.current = true;
    setSubmitState("loading");

    const payloadItems = lines.map((line) => ({
      id: line.id,
      name: line.kit?.name,
      kitManufacturer: line.kit?.kitManufacturer,
      planeManufacturer: line.kit?.planeManufacturer,
      planeModel: line.kit?.planeModel,
      scale: line.kit?.scale,
      amount: line.amount,
      unitPriceEur: line.unitPriceEur,
      lineTotalEur: line.lineTotalEur,
    }));

    const itemsSummary = payloadItems
      .map((line) => {
        const price =
          line.lineTotalEur != null
            ? ` — ${priceFormatter.format(line.lineTotalEur)}`
            : "";
        return `${line.amount} × ${line.name ?? line.id} (${line.id})${price}`;
      })
      .join("\n");

    const body = {
      name: values.name.trim(),
      email: values.email.trim(),
      country: values.country.trim(),
      message: values.message.trim(),
      _subject: `Order from ${values.name}`,
      itemsCount: totalCount,
      subtotalEur: hasAnyPrice ? subtotalEur : null,
      discountEur,
      shippingEur,
      paymentMethod: "PayPal",
      estimatedTotalEur: hasAnyPrice ? estimatedTotalEur : null,
      priceNote:
        "Prices are non-binding; the final amount will be confirmed by e-mail.",
      items: payloadItems,
      itemsSummary,
    };

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(body),
        signal: AbortSignal.timeout(30_000),
      });
      if (response.ok) {
        setSubmitState("success");
        form.reset();
        removeSubmittedItems(items);
      } else {
        setSubmitState("error");
      }
    } catch {
      setSubmitState("error");
    } finally {
      submitting.current = false;
    }
  };

  return (
    <Container size="md" py="xl">
      <Stack gap="xs" mb="xl">
        <Title order={2}>Your order</Title>
        <Text c="dimmed" size="sm">
          Review the items below, leave your contact details, and I'll get back
          to you to confirm the order.
        </Text>
      </Stack>

      {submitState === "success" && (
        <Alert
          icon={<IconCheck size={16} />}
          color="green"
          mb="lg"
          withCloseButton
          onClose={() => setSubmitState("idle")}
        >
          Order sent — thank you! I'll be in touch shortly.
        </Alert>
      )}

      {submitState === "error" && (
        <Alert
          icon={<IconAlertCircle size={16} />}
          color="red"
          mb="lg"
          withCloseButton
          onClose={() => setSubmitState("idle")}
        >
          Something went wrong. Please try again.
        </Alert>
      )}

      <Stack gap="xl">
        <section>
          <Title order={4} mb="sm">
            Items{" "}
            {totalCount > 0 && (
              <Text span c="dimmed">
                ({totalCount})
              </Text>
            )}
          </Title>

          {isEmpty ? (
            <Alert color="blue" variant="light">
              <Stack gap="sm" align="flex-start">
                <Text>Your cart is empty.</Text>
                <Button
                  component={Link}
                  to="/products"
                  variant="light"
                  rightSection={<IconArrowRight size={16} stroke={1.5} />}
                >
                  Browse kits
                </Button>
              </Stack>
            </Alert>
          ) : (
            <Stack gap="sm">
              {lines.map((line) => {
                const kit = line.kit;
                const imageUrl = kit?.images[0]
                  ? getKitImageUrl(kit.images[0])
                  : undefined;
                const kitLink = (
                  <Anchor
                    component={Link}
                    to={`/products/${line.id}`}
                    underline="hover"
                    fw={600}
                  >
                    {kit?.name ?? line.id}
                  </Anchor>
                );

                return (
                  <Card
                    key={line.id}
                    withBorder
                    radius="md"
                    padding="sm"
                    className={classes.lineCard}
                  >
                    <div className={classes.lineBody}>
                      {imageUrl && (
                        <Link
                          to={`/products/${line.id}`}
                          className={classes.thumbLink}
                          aria-label={`Open ${kit?.name ?? line.id}`}
                        >
                          <img
                            src={imageUrl}
                            alt={kit?.name ?? line.id}
                            loading="lazy"
                            className={classes.thumb}
                          />
                        </Link>
                      )}

                      <div className={classes.lineInfo}>
                        {kitLink}
                        {kit && (
                          <Text c="dimmed" size="xs">
                            {kit.planeManufacturer} · {kit.planeModel} ·{" "}
                            {kit.scale}
                            {kit.kitManufacturer
                              ? ` · ${kit.kitManufacturer}`
                              : ""}
                          </Text>
                        )}
                        {line.unitPriceEur != null && (
                          <Text size="xs" c="dimmed">
                            {priceFormatter.format(line.unitPriceEur)} each
                          </Text>
                        )}
                      </div>

                      <Group gap={6} wrap="nowrap" className={classes.qty}>
                        <ActionIcon
                          variant="default"
                          onClick={() => decrementItem(line.id)}
                          aria-label="Decrease amount"
                        >
                          <IconMinus size={16} stroke={1.5} />
                        </ActionIcon>
                        <Text
                          fw={600}
                          size="sm"
                          ta="center"
                          className={classes.qtyCount}
                        >
                          {line.amount}
                        </Text>
                        <ActionIcon
                          variant="default"
                          onClick={() => incrementItem(line.id)}
                          aria-label="Increase amount"
                        >
                          <IconPlus size={16} stroke={1.5} />
                        </ActionIcon>
                      </Group>

                      <div className={classes.lineTotal}>
                        {line.lineTotalEur != null ? (
                          <Text fw={600} size="sm">
                            {priceFormatter.format(line.lineTotalEur)}
                          </Text>
                        ) : (
                          <Text c="dimmed" size="xs">
                            —
                          </Text>
                        )}
                      </div>

                      <Tooltip label="Remove" withArrow position="left">
                        <ActionIcon
                          variant="subtle"
                          color="red"
                          onClick={() => removeItem(line.id)}
                          aria-label={`Remove ${kit?.name ?? line.id} from cart`}
                        >
                          <IconTrash size={16} stroke={1.5} />
                        </ActionIcon>
                      </Tooltip>
                    </div>
                  </Card>
                );
              })}

              <Divider />

              <Stack
                gap={4}
                align="flex-end"
                role="region"
                aria-label="Order estimate"
              >
                {hasAnyPrice && (
                  <Text size="sm">
                    Kit subtotal{hasMissingPrice ? " (partial)" : ""}:{" "}
                    {priceFormatter.format(subtotalEur)}
                  </Text>
                )}
                {discountEur > 0 && (
                  <Text size="sm" c="green">
                    Multi-kit discount (5%): −
                    {priceFormatter.format(discountEur)}
                  </Text>
                )}
                <Text size="sm">
                  Trackable airmail shipping:{" "}
                  {priceFormatter.format(shippingEur)}
                </Text>
                {hasAnyPrice && (
                  <Group gap="sm">
                    <Text c="dimmed" size="sm">
                      Estimated{hasMissingPrice ? " (partial)" : ""} total:
                    </Text>
                    <Text fw={700} size="lg">
                      {priceFormatter.format(estimatedTotalEur)}
                    </Text>
                  </Group>
                )}
                <Anchor component={Link} to="/payment-shipping" size="sm">
                  Payment by PayPal · Shipping details
                </Anchor>
                <Text c="dimmed" size="xs" ta="right">
                  Prices are non-binding; the final amount will be confirmed by
                  e-mail.
                </Text>
              </Stack>
            </Stack>
          )}
        </section>

        <section>
          <Title order={4} mb="sm">
            Your details
          </Title>
          <Box
            component="form"
            onSubmit={(event) => form.onSubmit(handleSubmit)(event)}
          >
            <Stack gap="md">
              <TextInput
                label="Name"
                autoComplete="name"
                disabled={submitState === "loading"}
                placeholder="Your name"
                withAsterisk
                {...form.getInputProps("name")}
              />
              <TextInput
                label="E-mail"
                type="email"
                autoComplete="email"
                disabled={submitState === "loading"}
                placeholder="your@email.com"
                withAsterisk
                {...form.getInputProps("email")}
              />
              <TextInput
                label="Country"
                autoComplete="country-name"
                disabled={submitState === "loading"}
                placeholder="Your country"
                withAsterisk
                {...form.getInputProps("country")}
              />
              <Textarea
                label="Notes"
                disabled={submitState === "loading"}
                placeholder="Anything I should know about the order..."
                minRows={4}
                autosize
                {...form.getInputProps("message")}
              />
              <Button
                type="submit"
                loading={submitState === "loading"}
                disabled={isEmpty}
              >
                Place order
              </Button>
            </Stack>
          </Box>
        </section>
      </Stack>
    </Container>
  );
}
