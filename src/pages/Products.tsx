import {
  Alert,
  Button,
  Container,
  Group,
  NativeSelect,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useSearchParams } from "react-router-dom";
import { CatalogNavigation } from "../components/CatalogNavigation";
import { KitCard } from "../components/KitCard/KitCard";
import { aircraftGroups, categories } from "../data/catalog";
import { kits } from "../data/kits";

export function ProductsPage() {
  const [params, setParams] = useSearchParams();
  const category =
    categories.find((item) => item.value === params.get("category")) ??
    categories[1];
  const scale =
    category.scales.find((item) => item === params.get("scale")) ?? "";
  const manufacturer =
    category.value === "parts" &&
    scale === "1/144" &&
    aircraftGroups.includes(params.get("manufacturer") ?? "")
      ? params.get("manufacturer")!
      : "";
  const query = params.get("q") ?? "";
  const terms = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
  const filtered = kits.filter((kit) => {
    if ((kit.category ?? "parts") !== category.value) return false;
    if (scale && kit.scale !== scale) return false;
    if (
      manufacturer === "Other" &&
      ["Boeing", "Airbus"].includes(kit.planeManufacturer)
    )
      return false;
    if (
      manufacturer &&
      manufacturer !== "Other" &&
      kit.planeManufacturer !== manufacturer
    )
      return false;
    const text = [
      kit.name,
      kit.id,
      kit.planeManufacturer,
      kit.planeModel,
      kit.kitManufacturer,
      kit.scale,
      kit.type,
    ]
      .join(" ")
      .toLowerCase();
    return terms.every((term) => text.includes(term));
  });

  function updateFilter(key: string, value: string) {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value);
    else next.delete(key);
    if (key === "scale") next.delete("manufacturer");
    setParams(next, { replace: key === "q" });
  }

  return (
    <Container size="lg" py="xl">
      <Stack gap="xl">
        <CatalogNavigation />
        <Stack gap="md">
          <Title order={1}>{category.label}</Title>
          <Group align="flex-end">
            <TextInput
              label="Search this section"
              placeholder="Engine, aircraft, manufacturer…"
              value={query}
              onChange={(event) => updateFilter("q", event.currentTarget.value)}
              style={{ flex: "1 1 240px" }}
            />
            {category.scales.length > 0 && (
              <NativeSelect
                label="Scale"
                value={scale}
                onChange={(event) =>
                  updateFilter("scale", event.currentTarget.value)
                }
                data={[{ value: "", label: "All scales" }, ...category.scales]}
              />
            )}
            {category.value === "parts" && scale === "1/144" && (
              <NativeSelect
                label="Aircraft manufacturer"
                value={manufacturer}
                onChange={(event) =>
                  updateFilter("manufacturer", event.currentTarget.value)
                }
                data={[
                  { value: "", label: "All manufacturers" },
                  ...aircraftGroups,
                ]}
              />
            )}
            {(query || scale || manufacturer) && (
              <Button
                variant="subtle"
                onClick={() => setParams({ category: category.value })}
              >
                Clear filters
              </Button>
            )}
          </Group>
          <Text c="dimmed" size="sm" role="status">
            {filtered.length} {filtered.length === 1 ? "product" : "products"}
          </Text>
          {filtered.length === 0 && (
            <Alert color="blue">
              {query
                ? "No products match your search. Try another term or clear the filters."
                : category.empty}
            </Alert>
          )}
          {filtered.map((kit) => (
            <KitCard key={kit.id} kit={kit} />
          ))}
        </Stack>
      </Stack>
    </Container>
  );
}
