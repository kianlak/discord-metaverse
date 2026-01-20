import { EmbedBuilder } from "discord.js";
import { getSystemPersona } from "../../utils/getSystemPersona.js";

export function buildInvalidUsageEmbed(
  systemPersona: ReturnType<typeof getSystemPersona>,
  chosenCommand: string,
  commandUsage: string
) {
  const embed = new EmbedBuilder()
    .setColor(0xff9f43)
    .setTitle(systemPersona.title)
    .setDescription([
      `\`\`\`Invalid usage of "${chosenCommand}"\`\`\`\n`,
      `\tTry:\n`, 
      `\`\`\`${commandUsage}\`\`\``
    ].join(''))
    .setFooter({ text: `${systemPersona.footer}` })
    .setTimestamp();

  if (systemPersona.thumbnailUrl) {
    embed.setThumbnail(systemPersona.thumbnailUrl);
  }

  return embed;
}
