import { EmbedBuilder } from "discord.js";

export function buildShopPurchaseSuccessEmbed(
  totalCost: number
) {
  return new EmbedBuilder()
    .setColor(0x2ecc71)
    .setTitle("✅ Purchase Complete")
    .setDescription(
      `Your purchase was successful!\n\n` +
      `💰 **${totalCost} Baleh Bucks** have been deducted from your balance.`
    )
    .setFooter({ text: "Thanks for shopping with Bolbi!" })
    .setTimestamp();
}
