import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../../components/layout/app-layout";
import DashboardPage from "../../features/dashboard/page";
import RigsPage from "../../features/rigs/page";
import ShipmentsPage from "../../features/shipments/page";
import WarehousesPage from "../../features/warehouses/page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: "rigs", element: <RigsPage /> },
      { path: "shipments", element: <ShipmentsPage /> },
      { path: "warehouses", element: <WarehousesPage /> },
    ],
  },
]);

export default router;
