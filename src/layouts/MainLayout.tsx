import { Anchor, Container, Text } from "@mantine/core";
import { useEffect, useRef } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { AppHeader } from "../components/AppHeader/AppHeader";
import { goodToKnowLinks, informationLinks, usefulLinks } from "../data/shop";
import { kitsById } from "../data/kits";
import classes from "./MainLayout.module.css";

export function MainLayout() {
  const { pathname } = useLocation();
  const main = useRef<HTMLElement>(null);
  const previousPath = useRef(pathname);
  useEffect(() => {
    const id = pathname.startsWith("/products/") ? pathname.slice(10) : "";
    const title =
      informationLinks.find((link) => link.href === pathname)?.label ??
      (Object.hasOwn(kitsById, id) ? kitsById[id].name : undefined) ??
      {
        "/": "Airliner model details",
        "/products": "Browse the catalog",
        "/cart": "Your order",
      }[pathname] ??
      "Page not found";
    document.title = `${title} | druz144`;
    if (previousPath.current !== pathname) {
      window.scrollTo(0, 0);
      main.current?.focus({ preventScroll: true });
      previousPath.current = pathname;
    }
  }, [pathname]);

  return (
    <div className={classes.site}>
      <a
        className={classes.skip}
        href="#main-content"
        onClick={(event) => {
          event.preventDefault();
          main.current?.focus();
          main.current?.scrollIntoView();
        }}
      >
        Skip to content
      </a>
      <header className={classes.header}>
        <AppHeader />
      </header>
      <main id="main-content" ref={main} tabIndex={-1} className={classes.main}>
        <Outlet />
      </main>
      <footer className={classes.footer}>
        <Container size="lg">
          <div className={classes.footerInner}>
            <div className={classes.footerBrand}>
              <Anchor component={Link} to="/" className={classes.brand}>
                druz144
              </Anchor>
              <Text size="sm" c="dimmed" mt="xs">
                Small scale. Every detail.
              </Text>
            </div>
            <div className={classes.footerNavigation}>
              <nav aria-label="Explore the site">
                <Text className="eyebrow" mb="xs">
                  Explore
                </Text>
                <div className={classes.footerLinks}>
                  {[
                    { label: "Home", href: "/" },
                    { label: "Products", href: "/products" },
                    { label: "Contact", href: "/contact" },
                    { label: "Cart", href: "/cart" },
                  ].map((link) => (
                    <NavLink
                      key={link.href}
                      to={link.href}
                      end={link.href === "/"}
                    >
                      {link.label}
                    </NavLink>
                  ))}
                </div>
              </nav>
              <nav aria-label="Shop information">
                <Text className="eyebrow" mb="xs">
                  Good to know
                </Text>
                <div className={classes.footerLinks}>
                  {goodToKnowLinks.map((link) => (
                    <NavLink key={link.href} to={link.href}>
                      {link.label}
                    </NavLink>
                  ))}
                </div>
              </nav>
              <nav
                aria-label="Useful links"
                className={classes.footerResources}
              >
                <Text className="eyebrow" mb="xs">
                  Useful links
                </Text>
                <div className={classes.footerLinks}>
                  {usefulLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </nav>
            </div>
          </div>
          <div className={classes.footerBottom}>
            <Text size="xs" c="dimmed">
              Airliner model parts by Sergey Druz.
            </Text>
            <div className={classes.footerServices}>
              <span>PayPal payments</span>
              <span>Tracked international airmail</span>
            </div>
          </div>
        </Container>
      </footer>
    </div>
  );
}
