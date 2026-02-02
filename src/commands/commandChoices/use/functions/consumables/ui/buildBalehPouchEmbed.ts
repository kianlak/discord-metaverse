import { EmbedBuilder } from "discord.js";

import type { getSystemPersona } from "../../../../../../utils/getSystemPersona.js";

export function buildBalehPouchEmbed(
  reward: number,
  systemPersona: ReturnType<typeof getSystemPersona>,
) {
  const embed = new EmbedBuilder()
    .setTitle("🎒 Baleh Pouch Opened")
    .setColor(0x2ecc71)
    .setDescription(
      `You rummage through the pouch and find \`${reward} Baleh Bucks\` 🪙`
    )
    .setFooter({ text: `${systemPersona.footer}` })
    .setTimestamp();

    if (systemPersona.thumbnailUrl) {
      embed.setThumbnail(systemPersona.thumbnailUrl);
    }

    return embed;
}
