import {
  ActionIcon,
  Container,
  Group,
  Indicator,
  Text,
  useComputedColorScheme,
  useMantineColorScheme,
} from "@mantine/core";
import { IconMoon, IconShoppingCart, IconSun } from "@tabler/icons-react";
import { Link, NavLink, useMatch } from "react-router-dom";
import { useCart } from "../../cart/useCart";
import classes from "./AppHeader.module.css";

const navLinks = [{ label: "Products", href: "/" }];

export function AppHeader() {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("light");
  const { totalCount } = useCart();
  const isCartActive = useMatch("/cart");
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
          {navLinks.map((link) => (
            <NavLink
              key={link.href}
              to={link.href}
              className={({ isActive }) =>
                `${classes.link} ${isActive ? classes.linkActive : ""}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </Group>
      </Group>

      <Group gap={8}>
        <Indicator
          label={totalCount}
          size={16}
          offset={4}
          disabled={totalCount === 0}
          inline
        >
          <ActionIcon
            component={Link}
            to="/cart"
            variant="default"
            size="lg"
            radius="md"
            aria-label="Cart"
            className={isCartActive ? classes.actionIconActive : ""}
          >
            <IconShoppingCart size={18} stroke={1.5} />
          </ActionIcon>
        </Indicator>

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
      </Group>
    </Container>
  );
}
