import { EmbedBuilder } from "discord.js";

import type { getSystemPersona } from "../../../../../../utils/getSystemPersona.js";

export function buildBalehPouchEmbed(
  reward: number,
  newBalance: number,
  systemPersona: ReturnType<typeof getSystemPersona>,
) {
  const embed = new EmbedBuilder()
    .setTitle("💰 Baleh Pouch Opened")
    .setColor(0x2ecc71)
    .setDescription(
      "You rummage through the pouch and discover some Baleh Bucks"
    )
    .addFields(
      {
        name: "💵 Baleh Bucks Gained",
        value: `\`${reward} Baleh Bucks\``,
        inline: true,
      },
      {
        name: "💰 New Balance",
        value: `\`${newBalance} Baleh Bucks\``,
        inline: true,
      }
    )
    .setFooter({ text: `${systemPersona.footer}` })
    .setTimestamp();

    if (systemPersona.thumbnailUrl) {
      embed.setThumbnail(systemPersona.thumbnailUrl);
    }

    return embed;
}
