import { EmbedBuilder } from "discord.js";
import { getCommandsByCategory } from "../utils/getCommandsByCategory.js";
import { resolveCategories } from "../helpers/resolveCategories.js";
import { getSystemPersona } from "../../../../utils/getSystemPersona.js";

export function buildHelpCategoryEmbed(category: string) {
  const commands = getCommandsByCategory(category);
  const systemPersona = getSystemPersona();

  const emoji =
    resolveCategories().find(c => c.name === category)
      ?.emoji ?? "📂";

  const description = commands
    .map(([name, config]) => {
      return [
        `\`\`\`+${name}\`\`\``,
        config.description,
        `*Usage:* \`${config.usage}\``,
        Array(21)
          .fill("<:iconetraitgris:1464522795009577010>")
          .join(""),
      ].join("\n");
    })
    .join("\n");

  const embed = new EmbedBuilder()
    .setTitle(`${emoji} ${category} Commands`)
    .setDescription(description || "_No commands found_")
    .setColor(0xfde047)
    .setFooter({ text: `${systemPersona.footer}` })
    .setTimestamp();

  if (systemPersona.thumbnailUrl) {
    embed.setThumbnail(systemPersona.thumbnailUrl);
  }

  return embed;
}
