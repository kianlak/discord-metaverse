export const BEG_QUERIES = {
  incrementBegProfitByDiscordId: `
    UPDATE beg_stats
    SET total_profit = total_profit + ?
    WHERE discord_id = ?
  `,
  
  incrementTotalBegs: `
    UPDATE beg_stats
    SET total_begs = total_begs + 1
    WHERE discord_id = ?
  `,

  getTotalBegsByDiscordId: `
    SELECT total_begs
    FROM beg_stats
    WHERE discord_id = ?
  `,

  getTotalProfitByDiscordId: `
    SELECT total_profit
    FROM beg_stats
    WHERE discord_id = ?
  `,

  setAchievementTierFourBegNumber: `
    UPDATE beg_stats
    SET tier_four_achieved_beg_number = ?
    WHERE discord_id = ?
  `,

  getTierFourAchievedBegNumber: `
    SELECT tier_four_achieved_beg_number
    FROM beg_stats
    WHERE discord_id = ?
  `,
} as const;
