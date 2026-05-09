import { Container, Stack } from "@mantine/core";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { KitCard } from "./components/KitCard/KitCard";
import kitCardClasses from "./components/KitCard/KitCard.module.css";
import { kits } from "./data/kits";

export function HomePage() {
  const location = useLocation();

  useEffect(() => {
    const id = location.hash.replace(/^#/, "");
    if (!id) return;
    const el = document.getElementById(id);
    if (!el) return;

    el.scrollIntoView({ behavior: "smooth", block: "center" });
    el.classList.add(kitCardClasses.highlight);
    const timeout = window.setTimeout(() => {
      el.classList.remove(kitCardClasses.highlight);
    }, 1600);

    return () => {
      window.clearTimeout(timeout);
      el.classList.remove(kitCardClasses.highlight);
    };
  }, [location.hash]);

  return (
    <Container size="lg" py="xl">
      <Stack gap="md">
        {kits.map((kit) => (
          <KitCard key={kit.id} kit={kit} />
        ))}
      </Stack>
    </Container>
  );
}
