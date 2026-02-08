import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} from "discord.js";

export function buildShopBuyButtons(userId: string) {
  return new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder()
      .setCustomId(`shop:add-to-cart:${userId}`)
      .setLabel("Add to Cart")
      .setEmoji("🛒")
      .setStyle(ButtonStyle.Success),

    new ButtonBuilder()
      .setCustomId(`shop:checkout:${userId}`)
      .setLabel("Checkout")
      .setEmoji("✅")
      .setStyle(ButtonStyle.Primary)
  );
}
