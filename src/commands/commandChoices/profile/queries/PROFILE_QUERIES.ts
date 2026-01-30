export const PROFILE_QUERIES = {
  getMainProfileStatsByDiscordId: `
    SELECT
      u.baleh_bucks               AS balance,
      u.last_beg_at               AS last_beg_at,
      COALESCE(b.total_begs, 0)   AS total_begs,
      COALESCE(b.total_profit, 0) AS total_beg_profit
    FROM users u
    LEFT JOIN beg_stats b
      ON b.discord_id = u.discord_id
    WHERE u.discord_id = ?
  `,
} as const;