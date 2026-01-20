import { EmbedBuilder } from "discord.js";
import { getSystemPersona } from "../../utils/getSystemPersona.js";

export function buildAllowedChannelsListEmbed(
  systemPersona: ReturnType<typeof getSystemPersona>,
  allowedChannelList: string
) {
  const embed = new EmbedBuilder()
    .setColor(0xff9f43)
    .setTitle(systemPersona.title)
    .setDescription([
      `\`\`\`This command can only be used in the following channel(s):\`\`\`\n`,
      `${allowedChannelList}`
    ].join(''))
    .setFooter({ text: `${systemPersona.footer}` })
    .setTimestamp();

  if (systemPersona.thumbnailUrl) {
    embed.setThumbnail(systemPersona.thumbnailUrl);
  }

  return embed;
}