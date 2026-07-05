import type { RouteObject } from "react-router-dom";
import DashboardPage from "@/features/dashboard/page";
import RigsPage from "@/features/rigs/page";
import RigDetailsPage from "@/features/rigs/details/page";
import ShipmentsPage from "@/features/shipments/page";
import WarehousesPage from "@/features/warehouses/page";

const routes: RouteObject[] = [
  {
    path: "/",
    children: [
      { index: true, element: <DashboardPage /> },
      {
        path: "rigs",
        children: [
          { index: true, element: <RigsPage /> },
          { path: ":rigId", element: <RigDetailsPage /> },
        ],
      },

      {
        path: "shipments",
        children: [
          { index: true, element: <ShipmentsPage /> },
          { path: ":shipmentId", element: <ShipmentsPage /> },
        ],
      },
      {
        path: "warehouses",
        children: [
          { index: true, element: <WarehousesPage /> },
          { path: ":warehouseId", element: <WarehousesPage /> },
        ],
      },
    ],
  },
];

export default routes;
