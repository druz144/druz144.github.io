/// <reference types="node" />

import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { expect, test } from "vitest";
import { kits } from "../src/data/kits";

test("catalog products have unique route IDs", () => {
  expect(new Set(kits.map((kit) => kit.id)).size).toBe(kits.length);
  for (const kit of kits) {
    expect(kit.id).toMatch(/^[a-z0-9_-]+$/);
  }
});

test("every catalog photo exists in the public assets", () => {
  for (const kit of kits) {
    for (const image of kit.images) {
      const path = fileURLToPath(
        new URL(`../public/kits/${image}`, import.meta.url),
      );
      expect(existsSync(path), `${kit.id}: ${image}`).toBe(true);
    }
  }
});
