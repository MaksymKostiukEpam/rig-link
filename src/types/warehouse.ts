import type { InventoryItem } from "./inventory";
import type { Location } from "./location";

export interface Warehouse extends Location {
  capacity: number;
  inventory: InventoryItem[];
}
