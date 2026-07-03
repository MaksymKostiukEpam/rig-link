import type { InventoryItem } from "./inventory";
import type { Location } from "./location";
import type { StorageCapacity } from "./storage";

export interface Warehouse extends Location {
  storageCapacity: StorageCapacity;
  inventory: InventoryItem[];
}
