export const ROUTES = {
  dashboard: "/",
  rigs: "/rigs",
  rigDetails: (id: string) => `/rigs/${id}`,
  shipments: "/shipments",
  shipmentDetails: (id: string) => `/shipments/${id}`,
  warehouses: "/warehouses",
  warehouseDetails: (id: string) => `/warehouses/${id}`,
} as const;
