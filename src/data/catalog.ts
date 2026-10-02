export const categories = [
  {
    value: "models",
    label: "3D models (STL files)",
    scales: ["1/200", "1/72"],
    empty: "No STL files are listed yet.",
  },
  {
    value: "parts",
    label: "Engine kits and parts",
    scales: ["1/144", "1/200"],
    empty: "No kits match these filters.",
  },
  {
    value: "aircraft",
    label: "Aircraft kits",
    scales: [],
    empty: "No aircraft kits are listed yet.",
  },
  {
    value: "progress",
    label: "In progress",
    scales: [],
    empty: "Project updates will appear here.",
  },
] as const;

export type CatalogCategory = (typeof categories)[number]["value"];
export const aircraftGroups = ["Boeing", "Airbus", "Other"];

export function catalogUrl(
  category: CatalogCategory,
  scale?: string,
  manufacturer?: string,
) {
  const params = new URLSearchParams({ category });
  if (scale) params.set("scale", scale);
  if (manufacturer) params.set("manufacturer", manufacturer);
  return `/products?${params}`;
}
