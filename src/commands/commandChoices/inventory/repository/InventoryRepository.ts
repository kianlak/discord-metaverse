import { getDb } from "../../../../bot/infra/database/sqlite.js";
import { INVENTORY_QUERIES } from "../queries/INVENTORY_QUERIES.js";

import type { InventoryItem } from "../types/InventoryItems.js";

export class InventoryRepository {
  private db = getDb();

  getUserInventoryByDiscordId(discordId: string): InventoryItem[] {
    const stmt = this.db.prepare(INVENTORY_QUERIES.getUserInventoryByDiscordId);

    return stmt.all(discordId) as InventoryItem[];
  }

  getUserItemQuantityByItemId(discordId: string, itemId: string): number {
    const stmt = this.db.prepare(INVENTORY_QUERIES.getUserItemQuantityByItemId);

    const row = stmt.get(discordId, itemId) as
      | { quantity: number }
      | undefined;

    return row?.quantity ?? 0;
  }

  decrementUserItem(discordId: string, itemId: string): void {
    const transaction = this.db.transaction(() => {
      const updateStmt = this.db.prepare(INVENTORY_QUERIES.decrementUserItemByItemId);

      const result = updateStmt.run(discordId, itemId);

      if (result.changes === 0) {
        throw new Error("User does not have enough of this item.");
      }

      const cleanupStmt = this.db.prepare(INVENTORY_QUERIES.deleteItemRowByItemId);

      cleanupStmt.run(discordId, itemId);
    });

    transaction();
  }

  addUserItem(discordId: string, itemId: string, itemType: string, quantity: number): void {
    this.db.prepare(
      INVENTORY_QUERIES.addUserItemByItemId
    ).run(
      discordId,
      itemId,
      itemType,
      quantity
    );
  }

  hasUserUsedItemByItemId(discordId: string, itemId: string): boolean {
    const stmt = this.db.prepare(INVENTORY_QUERIES.hasUserUsedItemByItemId);
    return Boolean(stmt.get(discordId, itemId));
  }

  markUserItemUsedByItemId(discordId: string, itemId: string): void {
    const stmt = this.db.prepare(INVENTORY_QUERIES.markUserItemUsedByItemId);
    stmt.run(Date.now(), discordId, itemId);
  }
}