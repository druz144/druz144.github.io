import {
  ActionIcon,
  Button,
  createTheme,
  virtualColor,
  type CSSVariablesResolver,
} from "@mantine/core";

export const theme = createTheme({
  primaryColor: "workshop",
  primaryShade: { light: 6, dark: 3 },
  autoContrast: true,
  colors: {
    workshop: virtualColor({ name: "workshop", light: "forest", dark: "sand" }),
    forest: [
      "#e9f6f1",
      "#cee8dd",
      "#9ed0ba",
      "#6bb798",
      "#429f7c",
      "#288f6b",
      "#167556",
      "#105f46",
      "#104d3b",
      "#0d4032",
    ],
    sand: [
      "#fbf8f1",
      "#f4ebdc",
      "#eddfc8",
      "#e5d4b3",
      "#d9c399",
      "#cbb183",
      "#b4996c",
      "#937a51",
      "#715c3d",
      "#4d402f",
    ],
  },
  fontFamily: '"Segoe UI", Arial, sans-serif',
  headings: { fontFamily: '"Segoe UI", Arial, sans-serif', fontWeight: "650" },
  defaultRadius: "md",
  components: {
    Button: Button.extend({ defaultProps: { size: "md" } }),
    ActionIcon: ActionIcon.extend({ defaultProps: { size: "lg" } }),
  },
});

export const cssVariablesResolver: CSSVariablesResolver = () => ({
  variables: {},
  light: { "--mantine-color-dimmed": "#616c65" },
  dark: {
    "--mantine-color-dimmed": "#b1beb5",
    "--mantine-color-workshop-light": "rgba(229, 212, 179, 0.12)",
    "--mantine-color-workshop-light-hover": "rgba(229, 212, 179, 0.2)",
    "--mantine-color-workshop-light-color": "var(--mantine-color-sand-3)",
  },
});
