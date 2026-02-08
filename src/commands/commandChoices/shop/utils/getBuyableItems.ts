import type { ItemType } from "../../../../items/types/ItemType.js";

import { ITEMS } from "../../../../items/constants/ITEMS.js";

export function getBuyableItemsByType(type: ItemType) {
  return ITEMS.filter(
    item => item.buyable === true && item.item_type === type
  );
}

export function getBuyableItemsById(itemId: string) {
  return ITEMS.find(
    item => item.item_id === itemId && item.buyable === true
  );
}
