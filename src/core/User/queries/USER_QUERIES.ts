export const USER_QUERIES = {
  ensureIsUserCreated: `
    INSERT INTO users (discord_id)
    VALUES (?)
    ON CONFLICT(discord_id) DO NOTHING
  `,

  doesUserExist: `
    SELECT 1
    FROM users
    WHERE discord_id = ?
    LIMIT 1
  `,

  getLastBegAtByDiscordId: `
    SELECT last_beg_at
    FROM users
    WHERE discord_id = ?
  `,

  incrementBalehBucks: `
    UPDATE users
    SET baleh_bucks = baleh_bucks + ?
    WHERE discord_id = ?
  `,

  decrementBalehBucks: `
    UPDATE users
    SET baleh_bucks = baleh_bucks - ?
    WHERE discord_id = ?
  `,

  updateLastBegAt: `
    UPDATE users
    SET last_beg_at = ?
    WHERE discord_id = ?
  `,

  getBalehBucksByDiscordId: `
    SELECT baleh_bucks
    FROM users
    WHERE discord_id = ?
  `,
} as const;
