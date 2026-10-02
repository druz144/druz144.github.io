import { Card, Container, SimpleGrid, Stack, Text, Title } from "@mantine/core";
import { CatalogNavigation } from "../components/CatalogNavigation";
import { ShopInformation } from "../components/ShopInformation";
import { informationLinks } from "../data/shop";
import classes from "./Home.module.css";

export function HomePage() {
  return (
    <Container size="lg" py="xl">
      <Stack gap="xl">
        <SimpleGrid cols={{ base: 1, xs: 2, md: 4 }}>
          {informationLinks.map((link) => (
            <Card key={link.href} withBorder radius="md" padding="lg">
              <Title order={2} size="h4" mb="sm">
                {link.label}
              </Title>
              <ShopInformation section={link.href} />
            </Card>
          ))}
        </SimpleGrid>
        <Stack gap="md" ta="center" py="xl">
          <Title order={1} className={classes.heroTitle}>
            Aftermarket parts and 3D models for airliner kits
          </Title>
          <Text size="lg" c="dimmed" maw={760} mx="auto">
            3D designed, molded and hand-made parts for airliner plastic and
            resin kits. Designed to fit Revell, Zvezda, and other manufacturers.
          </Text>
        </Stack>
        <CatalogNavigation />
      </Stack>
    </Container>
  );
}
