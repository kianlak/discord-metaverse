import { InventoryRepository } from "../repository/InventoryRepository.js";

import { getItemById } from "../helpers/itemRegistry.js";

import type { ItemType } from "../../../../items/types/ItemType.js";
import type { InventoryItem } from "../types/InventoryItems.js";

export class InventoryService {
  constructor(
    private readonly repo = new InventoryRepository()
  ) {}

  getUserInventory(discordId: string): InventoryItem[] {
    return this.repo.getUserInventoryByDiscordId(discordId);
  }

  getInventoryByType(
    discordId: string,
    itemType: ItemType
  ): InventoryItem[] {
    const inventory = this.getUserInventory(discordId);

    return inventory.filter(entry => {
      const item = getItemById(entry.item_id);
      return item?.item_type === itemType;
    });
  }

  getUserItemQuantity(discordId: string, itemId: string): number {
    return this.repo.getUserItemQuantityByItemId(discordId, itemId);
  }

  decrementUserItem(discordId: string, itemId: string): void {
    this.repo.decrementUserItem(discordId, itemId);
  }

  addUserItem(discordId: string, itemId: string, itemType: string, quantity: number): void {
    this.repo.addUserItem(discordId, itemId, itemType, quantity);
  }

  hasUsedItem(discordId: string, itemId: string): boolean {
    return this.repo.hasUserUsedItemByItemId(discordId, itemId);
  }

  markItemUsed(discordId: string, itemId: string) {
    this.repo.markUserItemUsedByItemId(discordId, itemId);
  }
}