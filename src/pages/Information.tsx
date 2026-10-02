import { Button, Container, Stack, Title } from "@mantine/core";
import { Link, useLocation } from "react-router-dom";
import { ShopInformation } from "../components/ShopInformation";
import { informationLinks } from "../data/shop";

export function InformationPage() {
  const { pathname } = useLocation();
  const information = informationLinks.find((link) => link.href === pathname);
  return (
    <Container size="md" py="xl">
      <Stack align="flex-start" gap="lg">
        <Title order={1}>{information?.label}</Title>
        <ShopInformation section={pathname} />
        <Button component={Link} to="/products" variant="light">
          Browse products
        </Button>
      </Stack>
    </Container>
  );
}
