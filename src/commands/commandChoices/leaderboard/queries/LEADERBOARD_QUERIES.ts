export const LEADERBOARD_QUERIES = {
  getLeaderboard: `
    SELECT
      discord_id,
      baleh_bucks
    FROM users
    WHERE baleh_bucks > 0
    ORDER BY baleh_bucks DESC
    LIMIT ?
  `,
} as const;