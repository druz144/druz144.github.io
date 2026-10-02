import { defineConfig, mergeConfig } from "vitest/config";
import { playwright } from "@vitest/browser-playwright";
import viteConfig from "./vite.config.ts";

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      attachmentsDir: "test-results",
      projects: [
        {
          extends: true,
          test: {
            name: "unit",
            include: ["tests/**/*.test.ts"],
            environment: "node",
          },
        },
        {
          extends: true,
          test: {
            include: ["tests/**/*.browser.test.tsx"],
            setupFiles: ["tests/browser.setup.ts"],
            browser: {
              enabled: true,
              headless: true,
              provider: playwright(),
              screenshotDirectory: "test-results/screenshots",
              instances: [
                {
                  browser: "chromium",
                  name: "desktop",
                  viewport: { width: 1280, height: 720 },
                },
                {
                  browser: "chromium",
                  name: "mobile",
                  viewport: { width: 390, height: 844 },
                  provider: playwright({
                    contextOptions: { isMobile: true, hasTouch: true },
                  }),
                },
              ],
            },
          },
        },
      ],
    },
  }),
);
