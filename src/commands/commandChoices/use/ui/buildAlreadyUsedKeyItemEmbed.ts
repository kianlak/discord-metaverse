import { EmbedBuilder, embedLength } from "discord.js";

import type { getSystemPersona } from "../../../../utils/getSystemPersona.js";

export function buildAlreadyUsedKeyItemEmbed(
  systemPersona: ReturnType<typeof getSystemPersona>,
  itemId: string,
  itemName: string,
) {
  const embed = new EmbedBuilder()
    .setColor(0xf39c12)
    .setTitle("⚠️ Item Already Used")
    .setDescription(
      [
        `You've already used **${itemName}**.`,
        `\`\`\`Item ID: ${itemId}\`\`\``,
        `This item can only be used once.`,
      ].join("\n")
    )
    .setFooter({ text: systemPersona.footer })
    .setTimestamp();

  if (systemPersona.thumbnailUrl) {
    embed.setThumbnail(systemPersona.thumbnailUrl);
  }

  return embed;
}