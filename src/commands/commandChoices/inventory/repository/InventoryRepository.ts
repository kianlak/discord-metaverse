import { getDb } from "../../../../bot/infra/database/sqlite.js";
import { INVENTORY_QUERIES } from "../queries/INVENTORY_QUERIES.js";

import type { InventoryItem } from "../types/InventoryItems.js";

export class InventoryRepository {
  private db = getDb();

  getUserInventoryByDiscordId(discordId: string): InventoryItem[] {
    const stmt = this.db.prepare(INVENTORY_QUERIES.getUserInventoryByDiscordId);

    return stmt.all(discordId) as InventoryItem[];
  }
}