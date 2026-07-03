import type { Alert } from "./alert";
import type { InventoryItem } from "./inventory";
import type { Location } from "./location";
import type { Weather } from "./weather";
import type { CrewStatus, StorageCapacity } from "./storage";

export type RigStatus = "Operational" | "Maintenance" | "Offline";

export interface Rig extends Location {
  status: RigStatus;
  crew: CrewStatus;
  storageCapacity: StorageCapacity;
  inventory: InventoryItem[];
  incomingShipmentIds: string[];
  outgoingShipmentIds: string[];
  alerts: Alert[];
  image: string;
  weather: Weather;
}
