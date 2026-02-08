import { getDb } from "../../../../bot/infra/database/sqlite.js";

import type { MainProfileStats } from "../interfaces/MainProfileStats.js";

import { PROFILE_QUERIES } from "../queries/PROFILE_QUERIES.js";

export class ProfileRepository {
  private db = getDb();

  getUserMainStatsByDiscordId(
    discordId: string,
    percentile: number
  ): MainProfileStats {
    const row = this.db
      .prepare(PROFILE_QUERIES.getMainProfileStatsByDiscordId)
      .get(discordId) as
      | {
          balance?: number;
          total_begs?: number;
          total_beg_profit?: number;
          last_beg_at?: number;
        }
      | undefined;

    return {
      currentBalance: row?.balance ?? 0,
      totalBegs: row?.total_begs ?? 0,
      totalBegProfit: row?.total_beg_profit ?? 0,
      lastBegAt: row?.last_beg_at ?? 0,
      begEfficiency: percentile
    };
  }
}