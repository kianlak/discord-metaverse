import { EmbedBuilder } from "discord.js";
import { msToDuration } from "../../../../utils/msToDuration.js";

import type { BegCommandConfig } from "../interfaces/BegCommandConfig.js";
import type { BegResult } from "../types/BegResult.js";

export function buildBegCooldownEmbed(
  begCommandConfig: BegCommandConfig,
  begResult: BegResult & {
    timeRemainingInMs: number
  }
) {
  const timeRemainingInSeconds = msToDuration(begResult.timeRemainingInMs, 'SECONDS');
  const minutes = Math.floor(timeRemainingInSeconds / 60);
  const seconds = timeRemainingInSeconds % 60;

  const minutesLabel =
    minutes > 0 ? `${minutes} ${minutes === 1 ? "minute" : "minutes"}` : null;

  const secondsLabel =
    seconds > 0 ? `${seconds} ${seconds === 1 ? "second" : "seconds"}` : null;

  const timeRemaining = [minutesLabel, secondsLabel]
    .filter(Boolean)
    .join(" ");

  const embed = new EmbedBuilder()
    .setColor(0xff9f43)
    .setTitle("⏳ Beg Cooldown")
    .setDescription(
      `\`\`\`Time remaining: ${timeRemaining}\`\`\``
    )
    .setFooter({ text: `${begCommandConfig.footer}` })
    .setTimestamp();

  if (begCommandConfig.thumbnailUrl) {
    embed.setThumbnail(begCommandConfig.thumbnailUrl);
  }

    return embed;
}
