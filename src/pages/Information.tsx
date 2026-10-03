import { Button, Container, Stack, Text, Title } from "@mantine/core";
import { IconArrowRight } from "@tabler/icons-react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ShopInformation } from "../components/ShopInformation";
import { goodToKnowLinks, informationLinks } from "../data/shop";
import classes from "./Information.module.css";

const introductions: Record<string, string> = {
  "/contact":
    "Need help choosing parts or checking compatibility? Get in touch with Sergey directly.",
  "/payment-shipping":
    "A personal ordering process, from the workbench to your door.",
  "/discount":
    "More details for your next build, with a little saving along the way.",
  "/useful-links":
    "Practical references to help with your airliner model build.",
};

export function InformationPage() {
  const { pathname } = useLocation();
  const isContact = pathname === "/contact";
  const information = informationLinks.find((link) => link.href === pathname);
  return (
    <Container size={isContact ? 720 : "lg"} className="page">
      <Text className="eyebrow" mb="sm">
        {isContact ? "Get in touch" : "Good to know"}
      </Text>
      <Title order={1} className="page-title">
        {information?.label}
      </Title>
      <Text c="dimmed" mt="md" maw={620}>
        {introductions[pathname]}
      </Text>
      <div
        className={`${classes.layout} ${isContact ? classes.contactLayout : ""}`}
      >
        {!isContact && (
          <nav aria-label="Information topics" className={classes.navigation}>
            {goodToKnowLinks.map((link) => (
              <NavLink key={link.href} to={link.href}>
                {link.label}
              </NavLink>
            ))}
          </nav>
        )}
        <Stack gap="xl" className={classes.content}>
          <ShopInformation section={pathname} />
          {pathname === "/payment-shipping" && (
            <div className={classes.steps}>
              <Title order={2} size="h3" mb="lg">
                How to order
              </Title>
              <ol>
                <li>
                  <strong>Choose your parts.</strong> Check the scale and
                  compatible kit, then add the items to your cart.
                </li>
                <li>
                  <strong>Send your request.</strong> Enter your name, email and
                  country. No payment is taken on the website.
                </li>
                <li>
                  <strong>Confirm by email.</strong> I’ll confirm your order and
                  final total, and arrange payment by PayPal.
                </li>
              </ol>
            </div>
          )}
          {isContact && (
            <Text size="sm" c="dimmed">
              For compatibility questions, please include your aircraft, scale
              and kit manufacturer.
            </Text>
          )}
          {!isContact && (
            <Button
              component={Link}
              to="/products"
              variant="light"
              rightSection={<IconArrowRight size={18} />}
              style={{ alignSelf: "flex-start" }}
            >
              Browse products
            </Button>
          )}
        </Stack>
      </div>
    </Container>
  );
}
