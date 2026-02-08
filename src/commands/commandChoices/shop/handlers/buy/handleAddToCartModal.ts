import { UserService } from "../../../../../core/User/services/UserService.js";
import { ShopSessionStore } from "../../shopSessions.js";
import { calculateCartTotal } from "../../utils/calculateCartTotals.js";
import { getBuyableItemsById } from "../../utils/getBuyableItems.js";

import type { ModalSubmitInteraction } from "discord.js";

export async function handleAddToCartModal(
  interaction: ModalSubmitInteraction
) {
  const [, , ownerId] = interaction.customId.split(":");

  if (interaction.user.id !== ownerId) {
    await interaction.reply({
      content: "❌ You can't submit this cart.",
      ephemeral: true,
    });
    return;
  }

  const session = ShopSessionStore.get(ownerId);

  if (!session) {
    await interaction.reply({
      content: "❌ Shop session expired.",
      ephemeral: true,
    });
    return;
  }

  const itemId = interaction.fields.getTextInputValue("item_id");
  const quantityRaw = interaction.fields.getTextInputValue("quantity");

  const quantity = Number(quantityRaw);

  if (!Number.isInteger(quantity) || quantity <= 0) {
    await interaction.reply({
      content: "❌ Quantity must be a positive number.",
      ephemeral: true,
    });
    return;
  }

  const item = getBuyableItemsById(itemId);

  if (!item) {
    await interaction.reply({
      content: "❌ Invalid or non-buyable item ID.",
      ephemeral: true,
    });
    return;
  }

  const existingQty = session.shoppingCart[itemId] ?? 0;

  if (item.oneTimeBuy && existingQty + quantity > 1) {
    await interaction.reply({
      content: `❌ **${item.item_name}** can only be purchased once.`,
      ephemeral: true,
    });
    return;
  }

  const userService = new UserService();
  const balance = userService.getBalehBucks(ownerId);

  const currentCartTotal = calculateCartTotal(session.shoppingCart);
  const newItemCost = (item.value ?? 0) * quantity;
  const newTotal = currentCartTotal + newItemCost;

  if (newTotal > balance) {
    await interaction.reply({
      content:
        `❌ You don't have enough Baleh Bucks.\n` +
        `Cart total: **${newTotal}**\n` +
        `Balance: **${balance}**`,
      ephemeral: true,
    });
    return;
  }

  session.shoppingCart[itemId] = (session.shoppingCart[itemId] ?? 0) + quantity;

  ShopSessionStore.set(session);

  await interaction.reply({
    content: `✅ Added **${quantity}x ${itemId}** to your cart.`,
    ephemeral: true,
  });
}
