import { getDb } from "../../../bot/infra/database/sqlite.js";

import { ACHIEVEMENT_QUERIES } from "../queries/ACHIEVEMENT_QUERIES.js";

export class AchievementRepository {
  private db = getDb();

  getUserAchievementTiersByDiscordId(discordId: string): Record<string, number> {
    const rows = this.db
      .prepare(ACHIEVEMENT_QUERIES.getUserAchievementTiers)
      .all(discordId) as {
        achievement_id: string;
        tier: number;
      }[];

    const result: Record<string, number> = {};

    for (const row of rows) {
      result[row.achievement_id] = row.tier;
    }

    return result;
  }

  setUserAchievementTierByDiscordId(
    discordId: string,
    achievementId: string,
    tier: number
  ): void {
    this.db
      .prepare(ACHIEVEMENT_QUERIES.setUserAchievementTier)
      .run(discordId, achievementId, tier);
  }
}
