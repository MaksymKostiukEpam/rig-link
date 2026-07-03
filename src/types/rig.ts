import type { Alert } from "./alert";
import type { InventoryItem } from "./inventory";
import type { Location } from "./location";

export type RigStatus = "Operational" | "Maintenance" | "Offline";

export interface Rig extends Location {
  status: RigStatus;
  crew: number;
  capacity: number;
  inventory: InventoryItem[];
  incomingShipmentIds: string[];
  outgoingShipmentIds: string[];
  alerts: Alert[];
}
