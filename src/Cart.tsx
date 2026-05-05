import {
  Alert,
  Box,
  Button,
  Container,
  Stack,
  Text,
  Textarea,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconAlertCircle, IconCheck } from "@tabler/icons-react";
import { useState } from "react";

type SubmitState = "idle" | "loading" | "success" | "error";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xvzlawdw";

export function CartPage() {
  const [submitState, setSubmitState] = useState<SubmitState>("idle");

  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      message: "",
    },
    validate: {
      name: (value) => (value.trim().length === 0 ? "Name is required" : null),
      email: (value) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
          ? null
          : "Invalid e-mail address",
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    setSubmitState("loading");
    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(values),
      });
      if (response.ok) {
        setSubmitState("success");
        form.reset();
      } else {
        setSubmitState("error");
      }
    } catch {
      setSubmitState("error");
    }
  };

  return (
    <Container size="xs" py="xl">
      <Stack gap="xs" mb="xl">
        <Title order={2}>Get in touch</Title>
        <Text c="dimmed" size="sm">
          Fill out the form below and I'll get back to you as soon as possible.
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
          Message sent — thank you!
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

      <Box component="form" onSubmit={form.onSubmit(handleSubmit)}>
        <Stack gap="md">
          <TextInput
            label="Name"
            placeholder="Your name"
            withAsterisk
            {...form.getInputProps("name")}
          />
          <TextInput
            label="E-mail"
            placeholder="your@email.com"
            withAsterisk
            {...form.getInputProps("email")}
          />
          <Textarea
            label="Message"
            placeholder="Your message..."
            minRows={4}
            autosize
            {...form.getInputProps("message")}
          />
          <Button type="submit" loading={submitState === "loading"}>
            Send message
          </Button>
        </Stack>
      </Box>
    </Container>
  );
}
