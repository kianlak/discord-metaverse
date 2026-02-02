export const USE_QUERIES = {
  addBalehBucksByDiscordId: `
    UPDATE users
    SET baleh_bucks = baleh_bucks + ?
    WHERE discord_id = ?
  `,
} as const;