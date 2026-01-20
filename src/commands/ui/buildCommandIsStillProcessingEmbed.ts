import { EmbedBuilder } from "discord.js";
import { getSystemPersona } from "../../utils/getSystemPersona.js";

export function buildCommandIsStillProcessingEmbed(
  systemPersona: ReturnType<typeof getSystemPersona>,
  chosenCommand: string
) {
  const embed = new EmbedBuilder()
    .setColor(0xff9f43)
    .setTitle(systemPersona.title)
    .setDescription(`\`\`\`⏳ Your previous "${chosenCommand}" command is still being processed...\`\`\`\n`)
    .setFooter({ text: `${systemPersona.footer}` })
    .setTimestamp();

  if (systemPersona.thumbnailUrl) {
    embed.setThumbnail(systemPersona.thumbnailUrl);
  }

  return embed;
}
