import { Button, Container, Stack, Text, Title } from "@mantine/core";
import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <Container size="lg" className="page">
      <Stack align="flex-start" gap="lg">
        <Text className="eyebrow">404 / Page not found</Text>
        <Title order={1}>Let’s get back to the workbench.</Title>
        <Text c="dimmed">
          This page doesn’t exist. Browse the catalog to find your next kit.
        </Text>
        <Button component={Link} to="/products">
          Browse products
        </Button>
      </Stack>
    </Container>
  );
}
