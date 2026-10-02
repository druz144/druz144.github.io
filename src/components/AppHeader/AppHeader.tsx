import {
  ActionIcon,
  Container,
  Group,
  Text,
  TextInput,
  Button,
  useComputedColorScheme,
  useMantineColorScheme,
} from "@mantine/core";
import { IconMoon, IconShoppingCart, IconSun } from "@tabler/icons-react";
import { Link, NavLink, useMatch, useNavigate } from "react-router-dom";
import { informationLinks } from "../../data/shop";
import { useCart } from "../../cart/useCart";
import classes from "./AppHeader.module.css";

const navLinks = [
  { label: "Home", href: "/", end: true },
  { label: "Products", href: "/products", end: false },
];

export function AppHeader() {
  const navigate = useNavigate();
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("light");
  const { totalCount } = useCart();
  const isCartActive = useMatch("/cart");
  const toggleColorScheme = () => {
    setColorScheme(computedColorScheme === "dark" ? "light" : "dark");
  };

  return (
    <Container size="lg" py="sm">
      <div className={classes.inner}>
        <Group gap="sm">
          <Text
            component={Link}
            to="/"
            fw={700}
            fz="1.75rem"
            className={classes.logo}
          >
            druz144
          </Text>
          <Group gap={4}>
            {navLinks.map((link) => (
              <NavLink
                key={link.href}
                to={link.href}
                end={link.end}
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
          <div className={classes.cartWrap}>
            <ActionIcon
              component={Link}
              to="/cart"
              variant="default"
              size="xl"
              radius="md"
              aria-label="Cart"
              className={isCartActive ? classes.actionIconActive : ""}
            >
              <IconShoppingCart size={22} stroke={1.5} />
            </ActionIcon>
            {totalCount > 0 && (
              <span className={classes.cartBadge}>{totalCount}</span>
            )}
          </div>

          <ActionIcon
            variant="default"
            size="xl"
            radius="md"
            onClick={toggleColorScheme}
            aria-label="Toggle color scheme"
          >
            {computedColorScheme === "dark" ? (
              <IconSun size={22} stroke={1.5} />
            ) : (
              <IconMoon size={22} stroke={1.5} />
            )}
          </ActionIcon>
        </Group>
      </div>
      <div className={classes.utilities}>
        <nav aria-label="Shop information" className={classes.utilityLinks}>
          {informationLinks.map((link) => (
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
        </nav>
        <form
          role="search"
          className={classes.search}
          onSubmit={(event) => {
            event.preventDefault();
            const query = String(
              new FormData(event.currentTarget).get("q") ?? "",
            ).trim();
            navigate(`/products?${new URLSearchParams({ q: query })}`);
          }}
        >
          <TextInput
            name="q"
            type="search"
            aria-label="Search products"
            placeholder="Search products"
            style={{ flex: 1, minWidth: 0 }}
          />
          <Button type="submit" variant="light">
            Search
          </Button>
        </form>
      </div>
    </Container>
  );
}
