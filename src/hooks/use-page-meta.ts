import { useLocation, matchPath } from "react-router-dom";
import { routeMeta } from "@/app/router/route-meta";
import { ROUTES } from "@/app/router/paths";

export function usePageMeta() {
  const { pathname } = useLocation();

  if (matchPath(ROUTES.rigs + "/:rigId", pathname)) {
    return {
      title: "Rig Details",
      subtitle: "Inspect rig information and operational status",
    };
  }

  if (matchPath(ROUTES.shipments + "/:shipmentId", pathname)) {
    return {
      title: "Shipment Details",
      subtitle: "Track shipment progress and cargo information",
    };
  }

  if (matchPath(ROUTES.warehouses + "/:warehouseId", pathname)) {
    return {
      title: "Warehouse Details",
      subtitle: "View warehouse inventory and capacity",
    };
  }

  return (
    routeMeta[pathname as keyof typeof routeMeta] ?? {
      title: "RigLink",
      subtitle: "",
    }
  );
}
