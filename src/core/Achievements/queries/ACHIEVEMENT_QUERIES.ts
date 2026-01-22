export const ACHIEVEMENT_QUERIES = {
  getUserAchievementTiers: `
    SELECT achievement_id, tier
    FROM user_achievements
    WHERE discord_id = ?
  `,

  setUserAchievementTier: `
    INSERT INTO user_achievements (
      discord_id,
      achievement_id,
      tier
    )
    VALUES (?, ?, ?)
    ON CONFLICT(discord_id, achievement_id)
    DO UPDATE SET
      tier = CASE
        WHEN excluded.tier > user_achievements.tier
        THEN excluded.tier
        ELSE user_achievements.tier
      END
  `,
} as const;
