import { EmbedBuilder } from "discord.js";
import { selectRandomPrompt } from "../../unknownCommand/utils/selectRandomPrompt.js";

import type { BegCommandConfig } from "../interfaces/BegCommandConfig.js";
import { getSystemPersona } from "../../../../utils/getSystemPersona.js";
import type { BegResult } from "../types/BegResult.js";

export function buildBegSuccessEmbed(
  begCommandConfig: BegCommandConfig,
  begResult: BegResult & {
    reward: number;
    newBalance: number;
    multiplier: number;
  }
) {
  const selectedPrompt = selectRandomPrompt(begCommandConfig);
  const systemPersona = getSystemPersona();

  const formatBalehBucks = (amount: number) =>
    `${amount} Baleh ${amount === 1 ? "Buck" : "Bucks"}`;

  const multiplier = begResult.multiplier ?? 1;

  const finalReward =
    multiplier > 1
      ? Math.ceil(begResult.reward *  multiplier)
      : begResult.reward;

  const achievementBonus = finalReward - begResult.reward;

  const begResultEmbed = new EmbedBuilder()
    .setColor(0x2ecc71)
    .setTitle("🪙 Beg Successful")
    .setDescription(
      begResult.reward === 0
        ? "You begged your heart out… but got nothing this time"
        : `You begged and received \`${formatBalehBucks(finalReward)}\`!`
    )
    .setFooter({ text: `${systemPersona.footer}` })
    .setTimestamp();

  if (systemPersona.thumbnailUrl) {
    begResultEmbed.setThumbnail(systemPersona.thumbnailUrl);
  }

  if (finalReward > 0) {
    begResultEmbed.addFields(
      {
        name: "💵 Base Reward",
        value: `\`${formatBalehBucks(begResult.reward)}\``,
        inline: true,
      },
      ...(multiplier > 1
        ? [{
            name: "✨ Achievement Bonus",
            value: `+\`${formatBalehBucks(achievementBonus)}\` (\`x${multiplier}\`)`,
            inline: true,
          }]
        : []),
      {
        name: "💰 New Balance",
        value: `\`${formatBalehBucks(begResult.newBalance)}\``,
        inline: false,
      }
    );
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