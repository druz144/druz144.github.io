import {
  Anchor,
  Card,
  Group,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { Link } from "react-router-dom";
import { aircraftGroups, catalogUrl, categories } from "../data/catalog";

export function CatalogNavigation() {
  return (
    <nav aria-label="Product categories">
      <SimpleGrid cols={{ base: 1, xs: 2, md: 4 }}>
        {categories.map((category) => (
          <Card key={category.value} withBorder radius="md" padding="lg">
            <Stack gap="sm">
              <Title order={2} size="h4">
                <Anchor
                  component={Link}
                  to={catalogUrl(category.value)}
                  inherit
                >
                  {category.label}
                </Anchor>
              </Title>
              {category.scales.map((scale) => (
                <Stack gap={4} key={scale}>
                  <Anchor
                    component={Link}
                    to={catalogUrl(category.value, scale)}
                    aria-label={`${category.label} ${scale}`}
                  >
                    {scale}
                  </Anchor>
                  {category.value === "parts" && scale === "1/144" && (
                    <Group gap="sm">
                      {aircraftGroups.map((manufacturer) => (
                        <Anchor
                          key={manufacturer}
                          size="sm"
                          component={Link}
                          to={catalogUrl("parts", scale, manufacturer)}
                        >
                          {manufacturer}
                        </Anchor>
                      ))}
                    </Group>
                  )}
                </Stack>
              ))}
              {category.value === "aircraft" && (
                <Text size="sm" c="dimmed">
                  Complete aircraft models
                </Text>
              )}
              {category.value === "progress" && (
                <Text size="sm" c="dimmed">
                  Upcoming projects and work in progress
                </Text>
              )}
            </Stack>
          </Card>
        ))}
      </SimpleGrid>
    </nav>
  );
}
