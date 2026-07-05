import { ROUTES } from "./paths";

export const routeMeta = {
  [ROUTES.dashboard]: {
    title: "Dashboard",
    subtitle: "Monitor offshore rigs, warehouses and shipments",
  },

  [ROUTES.rigs]: {
    title: "Rigs",
    subtitle: "Manage offshore drilling platforms and monitor their status",
  },

  [ROUTES.shipments]: {
    title: "Shipments",
    subtitle: "Track cargo movements and logistics operations",
  },

  [ROUTES.warehouses]: {
    title: "Warehouses",
    subtitle: "Manage storage locations and inventory",
  },
} as const;
