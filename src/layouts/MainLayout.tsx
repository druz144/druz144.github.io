import { AppShell } from "@mantine/core";
import { Outlet } from "react-router-dom";
import { AppHeader } from "../components/AppHeader/AppHeader";

export function MainLayout() {
  return (
    <AppShell header={{ height: 60 }}>
      <AppShell.Header>
        <AppHeader />
      </AppShell.Header>
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}
