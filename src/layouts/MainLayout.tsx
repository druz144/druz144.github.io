import { Box } from "@mantine/core";
import { Outlet } from "react-router-dom";
import { AppHeader } from "../components/AppHeader/AppHeader";

export function MainLayout() {
  return (
    <>
      <Box
        component="header"
        style={{
          borderBottom: "1px solid var(--mantine-color-default-border)",
        }}
      >
        <AppHeader />
      </Box>
      <main>
        <Outlet />
      </main>
    </>
  );
}
