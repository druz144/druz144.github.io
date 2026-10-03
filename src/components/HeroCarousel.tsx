import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { getKitImageUrl, kitsById } from "../data/kits";
import classes from "./HeroCarousel.module.css";

const highlights = [
  {
    id: "cfm56-7b_revell",
    category: "Engines",
    title: "CFM56-7B / Boeing 737 NG",
    image: "cfm56-7b_revell/2set_B.jpg",
    alt: "CFM56-7B engine components, including nacelles, fans and pylons",
  },
  {
    id: "winglets_b737_revell",
    category: "Winglets",
    title: "Winglets / Boeing 737 Classic & NG",
    image: "winglets_b737_revell/w7372.jpg",
    alt: "A pair of replacement winglets for Boeing 737 Classic and NG models",
  },
  {
    id: "nose_b747",
    category: "Nose sections",
    title: "Nose section / Boeing 747-400",
    image: "nose_b747/nb1.jpg",
    alt: "Boeing 747-400 replacement nose section with cockpit windows and panel details",
  },
];

export function HeroCarousel() {
  const track = useRef<HTMLDivElement>(null);
  const selectors = useRef<Array<HTMLButtonElement | null>>([]);
  const [active, setActive] = useState(0);

  function showSlide(index: number) {
    const next = (index + highlights.length) % highlights.length;
    track.current?.scrollTo({ left: next * track.current.clientWidth });
  }

  return (
    <section
      className={classes.carousel}
      aria-label="From the workbench"
      aria-roledescription="carousel"
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
          event.preventDefault();
          showSlide(active + (event.key === "ArrowRight" ? 1 : -1));
        }
      }}
    >
      <div className={classes.stage}>
        <div
          ref={track}
          className={classes.track}
          onScroll={(event) => {
            const { scrollLeft, clientWidth } = event.currentTarget;
            if (clientWidth) {
              const next = Math.max(
                0,
                Math.min(
                  highlights.length - 1,
                  Math.round(scrollLeft / clientWidth),
                ),
              );
              if (
                next !== active &&
                track.current?.contains(document.activeElement)
              ) {
                selectors.current[next]?.focus({ preventScroll: true });
              }
              setActive(next);
            }
          }}
        >
          {highlights.map((item, index) => (
            <div
              key={item.id}
              className={classes.slide}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${highlights.length}: ${item.category}`}
              aria-hidden={index !== active}
            >
              <Link
                to={`/products/${item.id}`}
                className={classes.product}
                tabIndex={index === active ? 0 : -1}
                aria-label={`Explore ${kitsById[item.id].name}`}
                draggable={false}
              >
                <img
                  src={getKitImageUrl(item.image)}
                  alt={item.alt}
                  fetchPriority={index === 0 ? "high" : "low"}
                  width="1080"
                  height="1080"
                  draggable={false}
                />
                <div className={classes.caption}>
                  <div>
                    <span>
                      {item.category} · {kitsById[item.id].scale}
                    </span>
                    <strong>{item.title}</strong>
                  </div>
                  <IconArrowRight size={22} aria-hidden="true" />
                </div>
              </Link>
            </div>
          ))}
        </div>
        <div className={classes.arrows}>
          <button
            type="button"
            aria-label="Previous product"
            onClick={() => showSlide(active - 1)}
          >
            <IconArrowLeft size={20} aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label="Next product"
            onClick={() => showSlide(active + 1)}
          >
            <IconArrowRight size={20} aria-hidden="true" />
          </button>
        </div>
      </div>
      <div className={classes.controls}>
        <span className={classes.counter} aria-live="polite" aria-atomic="true">
          {active + 1} / {highlights.length}
          <span className={classes.srOnly}>
            : {highlights[active].category}
          </span>
        </span>
        <div
          className={classes.selectors}
          role="group"
          aria-label="Choose a product"
        >
          {highlights.map((item, index) => (
            <button
              key={item.id}
              ref={(element) => {
                selectors.current[index] = element;
              }}
              type="button"
              className={classes.selector}
              aria-label={`Show ${item.category.toLowerCase()}`}
              aria-pressed={active === index}
              onClick={() => showSlide(index)}
            >
              <span />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
