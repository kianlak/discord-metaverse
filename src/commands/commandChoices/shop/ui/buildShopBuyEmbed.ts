import { EmbedBuilder } from "discord.js";

import type { ItemDefinition } from "../../../../items/interfaces/ItemDefinition.js";

export function buildShopBuyEmbed(items: ItemDefinition[]) {
  return new EmbedBuilder()
    .setColor(0x2ecc71)
    .setTitle("🛒 Shop — Buy")
    .setDescription(
      items.length === 0
        ? "_Nothing is for sale right now._"
        : items
            .map(item =>
              `**${item.item_name}**` +
              `${item.description}` +
              `💰 ${item.value} Baleh Bucks`
            )
            .join("\n\n")
    )
    .setFooter({ text: "Kian Canes Metaverse Manager" })
    .setTimestamp();
}
