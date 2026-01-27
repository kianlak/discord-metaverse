import { getDb } from "../../../../bot/infra/database/sqlite.js";

import { LEADERBOARD_QUERIES } from "../queries/LEADERBOARD_QUERIES.js";

export interface LeaderboardRow {
  discordId: string;
  balehBucks: number;
}

export class LeaderboardRepository {
  getLeaderboard(limit: number): LeaderboardRow[] {
    const db = getDb();

    const data = db.prepare(LEADERBOARD_QUERIES.getLeaderboard);

    const rows = data.all(limit) as {
      discord_id: string;
      baleh_bucks: number;
    }[];

    return rows.map(row => ({
      discordId: row.discord_id,
      balehBucks: row.baleh_bucks,
    }));
  }
}
