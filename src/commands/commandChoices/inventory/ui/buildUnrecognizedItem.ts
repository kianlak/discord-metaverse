import { EmbedBuilder } from "discord.js";

import type { getSystemPersona } from "../../../../utils/getSystemPersona.js";

export function buildUnrecognizedItem(
  systemPersona: ReturnType<typeof getSystemPersona>,
  itemId: string,
) {
  const embed = new EmbedBuilder()
    .setColor(0xe74c3c)
    .setTitle("❌ Item Not Found in Registry")
    .setDescription(
      [
        `You tried to get info for an item that does not exist`,
        `\`\`\`Item ID: ${itemId}\`\`\``,
      ].join("\n")
    )
    .setFooter({ text: systemPersona.footer })
    .setTimestamp();

  if (systemPersona.thumbnailUrl) {
    embed.setThumbnail(systemPersona.thumbnailUrl);
  }

  return embed;
}