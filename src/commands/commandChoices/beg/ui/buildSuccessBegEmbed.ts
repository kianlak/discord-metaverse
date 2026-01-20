import { EmbedBuilder } from "discord.js";
import { selectRandomPrompt } from "../../unknownCommand/utils/selectRandomPrompt.js";
import { getSystemPersona } from "../../../../utils/getSystemPersona.js";
import { resolvePersona } from "../../../../utils/resolvePersona.js";

import type { BegCommandConfig } from "../interfaces/BegCommandConfig.js";
import type { BegResult } from "../types/BegResult.js";

export function buildBegSuccessEmbed(
  begCommandConfig: BegCommandConfig,
  begResult: BegResult & {
    reward: number;
    newBalance: number;
    rewardFromAchievement?: number;
  }
) {
  const selectedPrompt = selectRandomPrompt(begCommandConfig);

  const systemPersona = getSystemPersona();

  const begResultEmbed = new EmbedBuilder()
    .setColor(0x2ecc71)
    .setTitle("🪙 Beg Successful")
    .setDescription(
      begResult.reward === 0
        ? "You begged your heart out… but got nothing this time."
        : `You begged and received \`${begResult.reward}\` Baleh Bucks!`
    )
    .addFields({
      name: "💰 New Balance",
      value: `\`${begResult.newBalance}\` Baleh Bucks`,
      inline: true,
    })
    .setFooter({ text: `${systemPersona.footer}` })
    .setTimestamp();

    if (systemPersona.thumbnailUrl) {
      begResultEmbed.setThumbnail(systemPersona.thumbnailUrl);
    }

    const channelResponseEmbed = new EmbedBuilder()
    .setColor(0xff4d8d)
    .setTitle(begCommandConfig.title)
    .setDescription(`\`\`\`${selectedPrompt}\`\`\``)
    .setFooter({ text: `${begCommandConfig.footer}` })
    .setTimestamp();

    if (begCommandConfig.thumbnailUrl) {
      channelResponseEmbed.setThumbnail(begCommandConfig.thumbnailUrl);
    }

    return [begResultEmbed, channelResponseEmbed];
}