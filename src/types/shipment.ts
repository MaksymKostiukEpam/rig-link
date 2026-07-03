import type { InventoryItem } from "./inventory";
import type { VehicleType } from "./vehicle";

export type ShipmentStatus =
  | "Preparing"
  | "Loading"
  | "In Transit"
  | "Delayed"
  | "Delivered";

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
  vehicle: VehicleType;
  eta: string;
  status: ShipmentStatus;
  cargo: InventoryItem[];
}
