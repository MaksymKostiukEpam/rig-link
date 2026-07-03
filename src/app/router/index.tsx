import { createBrowserRouter } from "react-router-dom";
import AppLayout from "@/components/layout/app-layout";
import routes from "./routes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: routes[0].children,
  },
]);

export default router;
