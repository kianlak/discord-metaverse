import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} from "discord.js";

export function buildShopWelcomeButtons(userId: string) {
  return new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder()
      .setCustomId(`shop:buy:${userId}`)
      .setLabel("Buy")
      .setEmoji("🛒")
      .setStyle(ButtonStyle.Primary),

    new ButtonBuilder()
      .setCustomId(`shop:sell:${userId}`)
      .setLabel("Sell")
      .setEmoji("💰")
      .setStyle(ButtonStyle.Secondary)
  );
}
