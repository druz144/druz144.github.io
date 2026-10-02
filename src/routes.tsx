import type { RouteObject } from "react-router-dom";
import { informationLinks } from "./data/shop";
import { MainLayout } from "./layouts/MainLayout";

export const routes: RouteObject[] = [
  {
    element: <MainLayout />,
    children: [
      {
        path: "*",
        lazy: async () => ({
          Component: (await import("./pages/NotFound")).NotFoundPage,
        }),
      },
      ...informationLinks.map((link) => ({
        path: link.href,
        lazy: async () => ({
          Component: (await import("./pages/Information")).InformationPage,
        }),
      })),
      {
        path: "/",
        lazy: async () => ({
          Component: (await import("./pages/Home")).HomePage,
        }),
      },
      {
        path: "/products",
        lazy: async () => ({
          Component: (await import("./pages/Products")).ProductsPage,
        }),
      },
      {
        path: "/products/:id",
        lazy: async () => ({
          Component: (await import("./pages/KitDetails")).KitDetailsPage,
        }),
      },
      {
        path: "/cart",
        lazy: async () => ({
          Component: (await import("./pages/Cart")).CartPage,
        }),
      },
    ],
  },
];
