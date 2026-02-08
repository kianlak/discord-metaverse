import { getDb } from "../../../bot/infra/database/sqlite.js";

import { USER_QUERIES } from "../queries/USER_QUERIES.js";

export class UserRepository {
  private db = getDb();

  ensureUserIsCreated(discordId: string): boolean {
    const result = this.db
      .prepare(USER_QUERIES.ensureIsUserCreated)
      .run(discordId);

    return result.changes === 1;
  }

  userExists(discordId: string): boolean {
    const row = this.db
      .prepare(USER_QUERIES.doesUserExist)
      .get(discordId);

    return !!row;
  }

  getLastBegAtByDiscordId(discordId: string): number {
    const row = this.db
      .prepare(USER_QUERIES.getLastBegAtByDiscordId)
      .get(discordId) as { last_beg_at: number };

    return row.last_beg_at;
  }

  getBalehBucksByDiscordId(discordId: string): number {
    const row = this.db
      .prepare(USER_QUERIES.getBalehBucksByDiscordId)
      .get(discordId) as { baleh_bucks: number };

    return row.baleh_bucks;
  }

  decrementBalehBucks(discordId: string, reward: number) {
    this.db
      .prepare(USER_QUERIES.incrementBalehBucks)
      .run(reward, discordId);
  }
}
