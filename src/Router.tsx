import { createHashRouter, RouterProvider } from "react-router-dom";
import { CartPage } from "./Cart";
import { HomePage } from "./Home";
import { MainLayout } from "./layouts/MainLayout";

const router = createHashRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/cart",
        element: <CartPage />,
      },
    ],
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
