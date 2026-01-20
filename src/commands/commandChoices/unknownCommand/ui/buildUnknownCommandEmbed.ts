import { EmbedBuilder } from "discord.js";

import { selectRandomPrompt } from "../utils/selectRandomPrompt.js";

import type { UnknownCommandConfig } from "../interfaces/UnknwonCommandConfig.js";

export function buildUnknownCommandEmbed(unknownCommandConfig: UnknownCommandConfig) {
  const selectedPrompt = selectRandomPrompt(unknownCommandConfig);

  const embed = new EmbedBuilder()
    .setColor(0xff4d8d)
    .setTitle(unknownCommandConfig.title)
    .setDescription(`\`\`\`${selectedPrompt}\`\`\``)
    .setFooter({ text: `${unknownCommandConfig.footer}` })
    .setTimestamp();

  if (unknownCommandConfig.thumbnailUrl) {
    embed.setThumbnail(unknownCommandConfig.thumbnailUrl);
  }

  return embed;
}
