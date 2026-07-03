export type InventoryUnit = "kg" | "pcs" | "L" | "m";

export interface InventoryItem {
  id: string;
  name: string;
  quantity: number;
  unit: InventoryUnit;
}
