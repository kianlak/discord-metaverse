import { EmbedBuilder } from "discord.js";
import type { getSystemPersona } from "../../../../utils/getSystemPersona.js";

export function buildNoItemOwnedEmbed(
  systemPersona: ReturnType<typeof getSystemPersona>,
  itemId: string,
) {
  const embed = new EmbedBuilder()
    .setColor(0xe74c3c)
    .setTitle("❌ Item Not Found in Inventory")
    .setDescription(
      [
        `You tried to use an item you don't have`,
        `\`\`\`Item ID: ${itemId}\`\`\``,
        `Check your inventory to see what items you own`,
      ].join("\n")
    )
    .setFooter({ text: systemPersona.footer })
    .setTimestamp();

  if (systemPersona.thumbnailUrl) {
    embed.setThumbnail(systemPersona.thumbnailUrl);
  }

  return embed;
}