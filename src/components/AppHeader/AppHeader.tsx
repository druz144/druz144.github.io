import {
  ActionIcon,
  Container,
  Group,
  Indicator,
  Text,
  useComputedColorScheme,
  useMantineColorScheme,
} from "@mantine/core";
import { IconMoon, IconSun } from "@tabler/icons-react";
import { Link, NavLink } from "react-router-dom";
import { useCart } from "../../cart/useCart";
import classes from "./AppHeader.module.css";

type NavLinkSpec = {
  label: string;
  href: string;
  withCartIndicator?: boolean;
};

const navLinks: NavLinkSpec[] = [
  { label: "Home", href: "/" },
  { label: "Cart", href: "/cart", withCartIndicator: true },
];

export function AppHeader() {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("light");
  const { totalCount } = useCart();
  const toggleColorScheme = () => {
    setColorScheme(computedColorScheme === "dark" ? "light" : "dark");
  };

  return (
    <Container size="lg" className={classes.inner}>
      <Group gap="lg">
        <Text
          component={Link}
          to="/"
          fw={700}
          size="lg"
          className={classes.logo}
        >
          druz144
        </Text>
        <Group gap={4}>
          {navLinks.map((link) => {
            const navLink = (
              <NavLink
                key={link.href}
                to={link.href}
                className={({ isActive }) =>
                  `${classes.link} ${isActive ? classes.linkActive : ""}`
                }
              >
                {link.label}
              </NavLink>
            );
            if (!link.withCartIndicator) return navLink;
            return (
              <Indicator
                key={link.href}
                label={totalCount}
                size={16}
                offset={4}
                disabled={totalCount === 0}
                inline
              >
                {navLink}
              </Indicator>
            );
          })}
        </Group>
      </Group>

      <ActionIcon
        variant="default"
        size="lg"
        radius="md"
        onClick={toggleColorScheme}
        aria-label="Toggle color scheme"
      >
        {computedColorScheme === "dark" ? (
          <IconSun size={18} stroke={1.5} />
        ) : (
          <IconMoon size={18} stroke={1.5} />
        )}
      </ActionIcon>
    </Container>
  );
}
