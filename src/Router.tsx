import { createHashRouter, RouterProvider } from "react-router-dom";
import { routes } from "./routes";

const router = createHashRouter(routes);

export function Router() {
  return <RouterProvider router={router} />;
}
