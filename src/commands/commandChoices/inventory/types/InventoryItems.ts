import type { ItemType } from "../../../../items/types/ItemType.js";

export interface InventoryItem {
  item_id: string;
  item_type: ItemType;
  quantity: number;
}
