import type { InventoryItem } from "./inventory";
import type { Vehicle } from "./vehicle";

export type ShipmentStatus =
  | "Preparing"
  | "Loading"
  | "In Transit"
  | "Delayed"
  | "Delivered"
  | "Cancelled";

export interface ShipmentLocation {
  id: string;
  name: string;
  type: "rig" | "warehouse";
}

export interface Shipment {
  id: string;
  originId: string;
  originName: string;
  destinationId: string;
  destinationName: string;
  vehicle: Vehicle;
  estimatedArrival: string;
  createdAt: string;
  lastUpdated: string;
  status: ShipmentStatus;
  cargo: InventoryItem[];
}
