import { EmbedBuilder } from "discord.js";
import { ITEMS } from "../../../../items/constants/ITEMS.js";

export function buildShopCheckoutEmbed(
  shoppingCart: Record<string, number>
) {
  const entries = Object.entries(shoppingCart);

  if (entries.length === 0) {
    return new EmbedBuilder()
      .setColor(0xe74c3c)
      .setTitle("🧾 Checkout")
      .setDescription("_Your cart is empty._")
      .setFooter({ text: "Kian Canes Metaverse Manager" })
      .setTimestamp();
  }

  let total = 0;

  const lines = entries.map(([itemId, qty]) => {
    const item = ITEMS.find(item => item.item_id === itemId);
    if (!item || !item.value) {
      return `**${itemId}**\n⚠️ Unknown item • Qty: ${qty}`;
    }

    const subtotal = item.value * qty;
    total += subtotal;

    return (
      `**${item.item_name}** \`(${item.item_id})\`\n` +
      `Qty: **${qty}** × ${item.value} = **${subtotal}**`
    );
  });

  return new EmbedBuilder()
    .setColor(0x3498db)
    .setTitle("🧾 Confirm Purchase")
    .setDescription(lines.join("\n\n"))
    .addFields({
      name: "Total Cost",
      value: `💰 **${total} Baleh Bucks**`,
      inline: false,
    })
    .setFooter({ text: "Please confirm your purchase" })
    .setTimestamp();
}
