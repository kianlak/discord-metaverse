import type { ButtonInteraction } from "discord.js";
import { ShopSessionStore } from "../../shopSessions.js";
import { ITEMS } from "../../../../../items/constants/ITEMS.js";
import { UserService } from "../../../../../core/User/services/UserService.js";
import { InventoryService } from "../../../inventory/services/inventoryService.js";
import { buildShopPurchaseSuccessEmbed } from "../../ui/buildShopPurchaseEmbed.js";

export async function handleShopBuyConfirmButton(interaction: ButtonInteraction) {
  const [, , ownerId] = interaction.customId.split(":");
  
  if (interaction.user.id !== ownerId) {
    await interaction.reply({
      content: "❌ You can't confirm someone else's purchase.",
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

  const cartEntries = Object.entries(session.shoppingCart);

  if (cartEntries.length === 0) {
    await interaction.reply({
      content: "❌ Your cart is empty.",
      ephemeral: true,
    });
    return;
  }

  let totalCost = 0;

  for (const [itemId, qty] of cartEntries) {
    const item = ITEMS.find(i => i.item_id === itemId && i.buyable);

    if (!item || !item.value) {
      await interaction.reply({
        content: `❌ Invalid item in cart: ${itemId}`,
        ephemeral: true,
      });
      return;
    }

    totalCost += item.value * qty;
  }

  const userService = new UserService();
  const balance = userService.getBalehBucks(ownerId);

  if (totalCost > balance) {
    await interaction.reply({
      content:
        `❌ You no longer have enough Baleh Bucks.\n` +
        `Total: **${totalCost}**\nBalance: **${balance}**`,
      ephemeral: true,
    });
    return;
  }

  await interaction.deferUpdate();

  userService.decrementBalehBucks(ownerId, totalCost);

  const inventoryService = new InventoryService();

  for (const [itemId, qty] of Object.entries(session.shoppingCart)) {
    const item = ITEMS.find(i => i.item_id === itemId);

    if (!item) {
      throw new Error(`Invalid item in cart: ${itemId}`);
    }

    inventoryService.addUserItem(
      ownerId,
      item.item_id,
      item.item_type,
      qty
    );
  }

  session.shoppingCart = {};
  ShopSessionStore.set(session);

  await interaction.message.edit({
    embeds: [buildShopPurchaseSuccessEmbed(totalCost)],
    components: [],
  });
}
