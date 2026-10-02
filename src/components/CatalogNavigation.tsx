import { Link, useSearchParams } from "react-router-dom";
import {
  aircraftGroups,
  catalogUrl,
  categories,
  type CatalogCategory,
} from "../data/catalog";
import classes from "./CatalogNavigation.module.css";

export function CatalogNavigation() {
  const [params] = useSearchParams();
  const active =
    categories.find((category) => category.value === params.get("category"))
      ?.value ?? "parts";

  function filterUrl(
    category: CatalogCategory,
    scale: string,
    manufacturer?: string,
  ) {
    const next = new URLSearchParams(params);
    const scaleSelected = active === category && params.get("scale") === scale;
    next.set("category", category);
    next.delete("page");
    next.delete("manufacturer");

    if (manufacturer) {
      next.set("scale", scale);
      if (!scaleSelected || params.get("manufacturer") !== manufacturer) {
        next.set("manufacturer", manufacturer);
      }
    } else if (scaleSelected) {
      next.delete("scale");
    } else {
      next.set("scale", scale);
    }

    return `/products?${next}`;
  }

  return (
    <nav aria-label="Product categories" className={classes.navigation}>
      <p className="eyebrow">The catalog</p>
      {[categories[1], categories[0], categories[2], categories[3]].map(
        (category) => (
          <div key={category.value} className={classes.category}>
            <Link
              to={catalogUrl(category.value)}
              className={classes.heading}
              aria-current={active === category.value ? "page" : undefined}
            >
              {category.label}
            </Link>
            {category.scales.length > 0 && (
              <div className={classes.scales}>
                {category.scales.map((scale) => (
                  <Link
                    key={scale}
                    to={filterUrl(category.value, scale)}
                    aria-label={`${category.label} ${scale}`}
                    aria-current={
                      active === category.value && params.get("scale") === scale
                        ? "page"
                        : undefined
                    }
                  >
                    {scale}
                  </Link>
                ))}
              </div>
            )}
            {category.value === "parts" && (
              <div className={classes.aircraft}>
                {aircraftGroups.map((manufacturer) => (
                  <Link
                    key={manufacturer}
                    to={filterUrl("parts", "1/144", manufacturer)}
                    aria-current={
                      active === "parts" &&
                      params.get("scale") === "1/144" &&
                      params.get("manufacturer") === manufacturer
                        ? "page"
                        : undefined
                    }
                  >
                    {manufacturer}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ),
      )}
      <div className={classes.help}>
        <strong>Finding the right fit?</strong>
        <p>Check the scale and base kit before ordering.</p>
        <Link to="/contact">Ask Sergey →</Link>
      </div>
    </nav>
  );
}
