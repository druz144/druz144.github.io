import {
  ActionIcon,
  Container,
  Group,
  TextInput,
  Button,
  useComputedColorScheme,
  useMantineColorScheme,
} from "@mantine/core";
import {
  IconMoon,
  IconShoppingBag,
  IconSun,
  IconSearch,
} from "@tabler/icons-react";
import {
  Link,
  matchPath,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { useCart } from "../../cart/useCart";
import { goodToKnowLinks } from "../../data/shop";
import classes from "./AppHeader.module.css";

export function AppHeader() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [params] = useSearchParams();
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("light");
  const { totalCount } = useCart();
  return (
    <Container size="lg">
      <div className={classes.inner}>
        <Link to="/" className={classes.logo} aria-label="druz144 home">
          druz144
        </Link>
        <nav aria-label="Main navigation" className={classes.navigation}>
          {[
            { label: "Home", href: "/", end: true },
            { label: "Products", href: "/products", end: false },
            { label: "Good to know", href: "/payment-shipping", end: true },
            { label: "Contact", href: "/contact", end: true },
          ].map((link) => {
            const currentPage = Boolean(
              matchPath({ path: link.href, end: true }, pathname),
            );
            const isActive =
              Boolean(
                matchPath({ path: link.href, end: link.end }, pathname),
              ) ||
              (link.href === "/payment-shipping" &&
                goodToKnowLinks.some((topic) =>
                  matchPath(topic.href, pathname),
                ));
            return (
              <Link
                key={link.href}
                to={link.href}
                aria-current={
                  isActive ? (currentPage ? "page" : "location") : undefined
                }
                className={`${classes.link} ${isActive ? classes.linkActive : ""}`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
        <Group gap={8} className={classes.actions} wrap="nowrap">
          <ActionIcon
            variant="subtle"
            color="gray"
            onClick={() =>
              setColorScheme(computedColorScheme === "dark" ? "light" : "dark")
            }
            aria-label="Toggle color scheme"
          >
            {computedColorScheme === "dark" ? (
              <IconSun size={19} stroke={1.5} />
            ) : (
              <IconMoon size={19} stroke={1.5} />
            )}
          </ActionIcon>
          <Link to="/cart" aria-label="Cart" className={classes.cart}>
            <IconShoppingBag size={20} stroke={1.5} />
            <span className={classes.cartLabel}>Cart</span>
            <span className={classes.cartBadge} aria-live="polite">
              {totalCount}
            </span>
          </Link>
        </Group>
      </div>
      <div className={classes.utilities}>
        <span className={classes.note}>
          Handmade airliner model details for a more personal build.
        </span>
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
            key={params.get("q") ?? ""}
            defaultValue={params.get("q") ?? ""}
            name="q"
            type="search"
            aria-label="Search products"
            placeholder="Find an engine, aircraft or kit…"
            size="sm"
            leftSection={<IconSearch size={16} />}
            style={{ flex: 1, minWidth: 0 }}
          />
          <Button type="submit" variant="subtle" size="sm">
            Search
          </Button>
        </form>
      </div>
    </Container>
  );
}
