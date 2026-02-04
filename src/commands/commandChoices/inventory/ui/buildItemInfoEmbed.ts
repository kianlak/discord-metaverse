import { EmbedBuilder } from "discord.js";

import type { ItemDefinition } from "../../../../items/interfaces/ItemDefinition.js";

const RARITY_COLORS: Record<string, number> = {
  COMMON: 0x95a5a6,
  UNCOMMON: 0x2ecc71,
  RARE: 0x3498db,
  EPIC: 0x9b59b6,
  LEGENDARY: 0xf1c40f,
};

export function buildItemInfoEmbed(item: ItemDefinition) {
  const color = RARITY_COLORS[item.rarity] ?? 0x7f8c8d;

  const embed = new EmbedBuilder()
    .setTitle(item.item_name)
    .setColor(color)
    .setDescription(`\`\`\`${item.description}\`\`\``)
    .addFields(
      {
        name: "🆔 Item ID",
        value: `\`${item.item_id}\``,
        inline: true,
      },
      {
        name: "✨ Rarity",
        value: `\`${item.rarity}\``,
        inline: true,
      },
      {
        name: "💰 Sell Value",
        value: item.sellable && item.sellPrice
          ? `\`${item.sellPrice} Baleh Bucks\``
          : `\`Not sellable\``,
        inline: true,
      }
    )
    .setFooter({
      text: `Item Type: ${item.item_type}`,
    })
    .setTimestamp();

    embed.setThumbnail(`attachment://${item.item_id}.png`);

    return embed;
}
