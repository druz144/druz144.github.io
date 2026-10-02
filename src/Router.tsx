import { createHashRouter, RouterProvider } from "react-router-dom";
import { informationLinks } from "./data/shop";
import { MainLayout } from "./layouts/MainLayout";

const router = createHashRouter([
  {
    element: <MainLayout />,
    children: [
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
]);

export function Router() {
  return <RouterProvider router={router} />;
}
