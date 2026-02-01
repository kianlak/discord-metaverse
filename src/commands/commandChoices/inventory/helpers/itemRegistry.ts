import type { ItemDefinition } from "../../../../items/interfaces/ItemDefinition.js";

import { ITEMS } from "../../../../items/constants/ITEMS.js";

const itemMap = new Map<string, ItemDefinition>();

for (const item of ITEMS) {
  itemMap.set(item.item_id, item);
}

export function getItemById(itemId: string): ItemDefinition | null {
  return itemMap.get(itemId) ?? null;
}

export function getAllItems(): ItemDefinition[] {
  return [...itemMap.values()];
}
