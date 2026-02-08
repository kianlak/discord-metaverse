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

  getUserItemQuantityByItemId: `
    SELECT quantity
    FROM user_inventory
    WHERE discord_id = ?
      AND item_id = ?
    LIMIT 1
  `,

  decrementUserItemByItemId: `
    UPDATE user_inventory
    SET quantity = quantity - 1
    WHERE discord_id = ?
      AND item_id = ?
      AND quantity >= 1
  `,

  addUserItemByItemId: `
    INSERT INTO user_inventory (
      discord_id,
      item_id,
      item_type,
      quantity
    )
    VALUES (?, ?, ?, ?)
    ON CONFLICT(discord_id, item_id)
    DO UPDATE SET
      quantity = quantity + excluded.quantity
  `,

  deleteItemRowByItemId: `
    DELETE FROM user_inventory
    WHERE discord_id = ?
      AND item_id = ?
      AND quantity <= 0
  `,

  hasUserUsedItemByItemId: `
    SELECT 1
    FROM user_inventory
    WHERE discord_id = ?
      AND item_id = ?
      AND last_used_at IS NOT NULL
    LIMIT 1
  `,

  markUserItemUsedByItemId: `
    UPDATE user_inventory
    SET last_used_at = ?
    WHERE discord_id = ?
      AND item_id = ?
        AND last_used_at IS NULL
  `,
}