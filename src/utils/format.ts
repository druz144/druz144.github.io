import type { ManualLink } from "../data/kits";

export const priceFormatter = new Intl.NumberFormat("en-IE", {
  style: "currency",
  currency: "EUR",
});

export function manualLabel(manual: ManualLink): string {
  if (manual.label && manual.label.trim().length > 0) return manual.label;
  try {
    return new URL(manual.url).hostname.replace(/^www\./, "");
  } catch {
    return "Manual";
  }
}
