import {
  Alert,
  Button,
  Container,
  Group,
  NativeSelect,
  Pagination,
  SimpleGrid,
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
import classes from "./Products.module.css";

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
      kit.description,
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
    next.delete("page");
    setParams(next, { replace: key === "q" });
  }

  const pageSize = 12;
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const requestedPage = Number(params.get("page")) || 1;
  const page = Math.max(1, Math.min(totalPages, Math.floor(requestedPage)));

  return (
    <Container size="lg" className="page">
      <div className={classes.intro}>
        <Text className="eyebrow" mb="sm">
          Made for the details
        </Text>
        <Title order={1} className="page-title">
          {category.label}
        </Title>
        <Text c="dimmed" mt="md">
          {category.value === "parts"
            ? "Find the right parts for your build. Choose a scale, then check compatibility with your base kit."
            : category.value === "models"
              ? "Digital models for your workbench. Available downloads will be listed here."
              : category.value === "aircraft"
                ? "Explore complete aircraft model kits as they join the catalog."
                : "A look at what’s next from the workshop."}
        </Text>
      </div>
      <div className={classes.layout}>
        <CatalogNavigation />
        <Stack gap="lg" miw={0}>
          <Group align="flex-end" className={classes.filters}>
            <TextInput
              label="Search this section"
              placeholder="Try CFM56, A320 or Revell…"
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
          <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="lg">
            {filtered
              .slice((page - 1) * pageSize, page * pageSize)
              .map((kit) => (
                <KitCard key={kit.id} kit={kit} />
              ))}
          </SimpleGrid>
          {totalPages > 1 && (
            <div className={classes.pagination}>
              <Text size="sm" c="dimmed">
                Showing {(page - 1) * pageSize + 1}–
                {Math.min(page * pageSize, filtered.length)} of{" "}
                {filtered.length}
              </Text>
              <Pagination
                total={totalPages}
                value={page}
                siblings={0}
                boundaries={1}
                size="sm"
                getItemProps={(pageNumber) => ({
                  "aria-label": `Page ${pageNumber}`,
                })}
                getControlProps={(control) => ({
                  "aria-label": `${control[0].toUpperCase()}${control.slice(1)} page`,
                })}
                onChange={(value) => {
                  const next = new URLSearchParams(params);
                  next.set("page", String(value));
                  setParams(next);
                  window.scrollTo({ top: 0, behavior: "instant" });
                }}
              />
            </div>
          )}
        </Stack>
      </div>
    </Container>
  );
}
