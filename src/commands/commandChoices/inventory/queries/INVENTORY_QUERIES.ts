export const INVENTORY_QUERIES = {
  getUserInventoryByDiscordId: `
    SELECT
      discord_id,
      item_id,
      item_type,
      quantity
    FROM user_inventory
    WHERE discord_id = ?
      AND quantity > 0
  `,
}