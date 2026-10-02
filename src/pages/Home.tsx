import { Anchor, Button, Container, Group, Text, Title } from "@mantine/core";
import {
  IconArrowRight,
  IconPackage,
  IconPlane,
  IconRulerMeasure,
} from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { HeroCarousel } from "../components/HeroCarousel";
import { aircraftGroups, catalogUrl } from "../data/catalog";
import { shop } from "../data/shop";
import classes from "./Home.module.css";

export function HomePage() {
  return (
    <Container size="lg">
      <section className={classes.hero}>
        <div className={classes.heroCopy}>
          <Text className="eyebrow" mb="lg">
            From the workshop of Sergey Druz
          </Text>
          <Title order={1} className={classes.heroTitle}>
            Small scale.
            <br />
            <span>Every detail.</span>
          </Title>
          <Text className={classes.intro}>
            Aftermarket engine kits and detail parts for your next airliner
            build. Designed in 3D, moulded and finished by hand.
          </Text>
          <Group gap="md" mt="xl">
            <Button
              component={Link}
              to="/products"
              rightSection={<IconArrowRight size={18} />}
            >
              Explore the catalog
            </Button>
            <Anchor component={Link} to="/contact" size="sm" c="inherit">
              Ask about your build
            </Anchor>
          </Group>
          <Text size="xs" c="dimmed" mt="xl">
            For plastic and resin kits · 1/144 & 1/200 scales
          </Text>
        </div>
        <HeroCarousel />
      </section>
      <section className={classes.facts} aria-label="Shop at a glance">
        <div>
          <IconRulerMeasure size={24} stroke={1.3} />
          <div>
            <strong>Check the fit</strong>
            <span>Choose your scale and check your base kit</span>
          </div>
        </div>
        <div>
          <IconPlane size={24} stroke={1.3} />
          <div>
            <strong>International airmail</strong>
            <span>Tracked shipping from €{shop.shippingFirstEur}</span>
          </div>
        </div>
        <div>
          <IconPackage size={24} stroke={1.3} />
          <div>
            <strong>A little more for your workbench</strong>
            <span>
              5% off kit prices when you order {shop.discountMinimum} or more
            </span>
          </div>
        </div>
      </section>
      <section className={classes.section}>
        <div className={classes.sectionHeading}>
          <div>
            <Text className="eyebrow" mb="xs">
              Find your next detail
            </Text>
            <Title order={2}>Start with your aircraft.</Title>
          </div>
          <Anchor component={Link} to="/products" c="inherit" size="sm">
            View all products →
          </Anchor>
        </div>
        <nav aria-label="Product categories" className={classes.aircraftGrid}>
          {aircraftGroups.map((manufacturer, index) => (
            <Link
              key={manufacturer}
              to={catalogUrl("parts", "1/144", manufacturer)}
              className={classes.aircraftLink}
              aria-label={manufacturer}
            >
              <span className={classes.index}>0{index + 1} / 1:144</span>
              <strong>{manufacturer}</strong>
              <span>
                {
                  [
                    "737, 747, 757 and more",
                    "A300 to A380 families",
                    "Douglas, Lockheed and more",
                  ][index]
                }
              </span>
              <IconArrowRight size={21} className={classes.aircraftArrow} />
            </Link>
          ))}
        </nav>
      </section>
      <section className={classes.orderGuide}>
        <div>
          <Text className="eyebrow" mb="sm">
            Direct from the maker
          </Text>
          <Title order={2}>Your next build starts here.</Title>
          <Text c="dimmed" mt="sm">
            Choose your parts and send an order request. I’ll confirm the
            details and final price by email before you pay with PayPal.
          </Text>
        </div>
        <Button
          component={Link}
          to="/payment-shipping"
          variant="outline"
          rightSection={<IconArrowRight size={18} />}
        >
          How to order
        </Button>
      </section>
    </Container>
  );
}
