import { getDb } from "../../../../bot/infra/database/sqlite.js";
import { USE_QUERIES } from "../queries/USE_QUERIES.js";

export class UseRepository {
  private readonly db = getDb();

  addBalehBucksByDiscordId(discordId: string, reward: number): void {
    const stmt = this.db.prepare(USE_QUERIES.addBalehBucksByDiscordId);

    stmt.run(reward, discordId);
  }
}
