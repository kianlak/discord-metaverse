import { ITEMS } from "../../../../items/constants/ITEMS.js";

export function calculateCartTotal(shoppingCart: Record<string, number>): number {
  return Object.entries(shoppingCart).reduce((total, [itemId, qty]) => {
    const item = ITEMS.find(item => item.item_id === itemId);
    if (!item || !item.value) return total;

    return total + item.value * qty;
  }, 0);
}
