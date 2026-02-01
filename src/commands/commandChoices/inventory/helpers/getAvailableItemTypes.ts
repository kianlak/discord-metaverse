import type { ItemType } from "../../../../items/types/ItemType.js";
import type { InventoryItem } from "../types/InventoryItems.js";

const ITEM_TYPE_ORDER: ItemType[] = [
  "CONSUMABLE",
  "MATERIAL",
  "KEY",
];

export function getAvailableItemTypes(
  inventory: InventoryItem[]
): ItemType[] {
  const foundTypes = new Set<ItemType>();

  for (const item of inventory) {
    if (item.quantity > 0) {
      foundTypes.add(item.item_type);
    }
  }

  return ITEM_TYPE_ORDER.filter(type => foundTypes.has(type));
}
