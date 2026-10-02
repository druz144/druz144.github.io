import "@mantine/core/styles.css";
import "./styles.css";

import { MantineProvider } from "@mantine/core";
import { Router } from "./Router";
import { cssVariablesResolver, theme } from "./theme";

export default function App() {
  return (
    <MantineProvider
      theme={theme}
      defaultColorScheme="auto"
      cssVariablesResolver={cssVariablesResolver}
    >
      <Router />
    </MantineProvider>
  );
}
