import { EmbedBuilder } from "discord.js";
import { msToDuration } from "../../../../utils/msToDuration.js";

import type { UserContext } from "../../../../interfaces/UserContext.js";
import type { MainProfileStats } from "../interfaces/MainProfileStats.js";

import { BEG_COOLDOWN_MS } from "../../beg/constants/BEG_COOLDOWN_MS.js";

export function buildMainProfileEmbed(
  user: UserContext,
  stats: MainProfileStats
) {
  const elapsed = Date.now() - stats.lastBegAt;
  const remaining = BEG_COOLDOWN_MS - elapsed;
  
  const cooldown =
    remaining <= 0
      ? `Ready`
      : `\`${msToDuration(remaining, "SECONDS")} seconds\``;

  return new EmbedBuilder()
    .setColor(0xf1c40f)
    .setAuthor({
      name: `${user.name}'s Profile`,
      iconURL: user.avatarURL ?? '',
    })
    .setThumbnail(user.avatarURL ?? '')
    .addFields(
      {
        name: '💰 Baleh Bucks',
        value: `\`${stats.currentBalance.toLocaleString()}\``,
        inline: true,
      },
      {
        name: '⏳ Beg Cooldown',
        value: cooldown,
        inline: true,
      },
      {
        name: '',
        value: '',
        inline: false,
      },
      {
        name: '📈 Beg Profit',
        value: `\`${stats.totalBegProfit.toLocaleString()}\``,
        inline: true,
      },
      {
        name: '🙏 Total Begs',
        value: `\`${stats.totalBegs.toLocaleString()}\``,
        inline: true,
      },
    )
    .setFooter({ text: 'Kian Canes Metaverse Manager' })
    .setTimestamp();
}