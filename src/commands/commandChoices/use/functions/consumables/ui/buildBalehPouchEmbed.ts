import { EmbedBuilder } from "discord.js";

import type { getSystemPersona } from "../../../../../../utils/getSystemPersona.js";

export function buildBalehPouchEmbed(
  reward: number,
  newBalance: number,
  systemPersona: ReturnType<typeof getSystemPersona>,
) {
    const formatBalehBucks = (amount: number) =>
    `${amount} Baleh ${amount === 1 ? "Buck" : "Bucks"}`;

  const embed = new EmbedBuilder()
    .setTitle("💰 Baleh Pouch Opened")
    .setColor(0x2ecc71)
    .setDescription(
      "You rummage through the pouch and discover some Baleh Bucks"
    )
    .addFields(
      {
        name: "💵 Baleh Bucks Gained",
        value: `\`${formatBalehBucks(reward)}\``,
        inline: true,
      },
      {
        name: "💰 New Balance",
        value: `\`${formatBalehBucks(newBalance)}\``,
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
