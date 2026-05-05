import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomePage } from "./Home";
import { MainLayout } from "./layouts/MainLayout";

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
    ],
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
