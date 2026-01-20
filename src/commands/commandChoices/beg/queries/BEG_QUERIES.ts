export const BEG_QUERIES = {
  incrementBegProfit: `
    UPDATE beg_stats
    SET total_profit = total_profit + ?
    WHERE discord_id = ?
  `,
  
  incrementTotalBegs: `
    UPDATE beg_stats
    SET total_begs = total_begs + 1
    WHERE discord_id = ?
  `
} as const;
