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

  const timeRemainingInSeconds = msToDuration(BEG_COOLDOWN_MS - elapsed, 'SECONDS');
  const minutes = Math.floor(timeRemainingInSeconds / 60);
  const seconds = timeRemainingInSeconds % 60;

  const minutesLabel =
    minutes > 0 ? `${minutes} ${minutes === 1 ? "minute" : "minutes"}` : null;

  const secondsLabel =
    seconds > 0 ? `${seconds} ${seconds === 1 ? "second" : "seconds"}` : null;

  const timeRemaining = [minutesLabel, secondsLabel]
    .filter(Boolean)
    .join(" ");

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
        value: `\`${BEG_COOLDOWN_MS - elapsed <= 0 ? `\`Ready\`` : timeRemaining}\``,
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
            {
        name: '',
        value: '',
        inline: false,
      },
      {
        name: '📊 Beg Efficiency',
        value: `\`${stats.begEfficiency.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}%\``,
        inline: true,
      },
    )
    .setFooter({ text: 'Kian Canes Metaverse Manager' })
    .setTimestamp();
}