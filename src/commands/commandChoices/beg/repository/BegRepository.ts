import { getDb } from "../../../../bot/infra/database/sqlite.js";

import { USER_QUERIES } from "../../../../core/User/queries/USER_QUERIES.js";
import { BEG_QUERIES } from "../queries/BEG_QUERIES.js";

export class BegRepository {
  private db = getDb();

  applyBeg(input: {
    discordId: string;
    reward: number;
    timestamp: number;
  }) {
    const { discordId, reward, timestamp } = input;

    const applyBegResultTransaction = this.db.transaction(() => {
      this.db.prepare(USER_QUERIES.incrementBalehBucks)
        .run(reward, discordId);

      this.db.prepare(BEG_QUERIES.incrementBegProfitByDiscordId)
        .run(reward, discordId);

      this.db.prepare(BEG_QUERIES.incrementTotalBegs)
        .run(discordId);

      this.db.prepare(USER_QUERIES.updateLastBegAt)
        .run(timestamp, discordId);
    });

    applyBegResultTransaction();
  }

  getTotalBegsByDiscordId(discordId: string): number {
    const row = this.db
      .prepare(BEG_QUERIES.getTotalBegsByDiscordId)
      .get(discordId) as { total_begs?: number };

    return row?.total_begs ?? 0;
  }

  getTotalBegProfitByDiscordId(discordId: string): number {
    const row = this.db
      .prepare(BEG_QUERIES.getTotalProfitByDiscordId)
      .get(discordId) as { total_profit?: number };

    return row?.total_profit ?? 0;
  }
}
