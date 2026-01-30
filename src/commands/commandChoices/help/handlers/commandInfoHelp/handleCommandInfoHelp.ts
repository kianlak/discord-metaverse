import { EmbedBuilder } from "discord.js";
import { resolveCategories } from "../../helpers/resolveCategories.js";
import { logger } from "../../../../../bot/logger/logger.js";

import type { RequestContext } from "../../../../../interfaces/RequestContext.js";

import { COMMANDS } from "../../../../constants/commandRegistry.js";

export async function handleCommandInfoHelp(
  requestContext: RequestContext,
  command: string
) {
  const normalized = command.toLowerCase();

  const commandEntry = Object.entries(COMMANDS).find(
    ([name]) => name.toLowerCase() === normalized
  );

  if (!commandEntry) {
    await requestContext.message.reply(`❌ Unknown command: \`${command}\``);
    return;
  }

  const [name, config] = commandEntry;

  const categoryEmoji =
    resolveCategories().find(
      cateogires => cateogires.name === config.category
    )?.emoji ?? '📂';

  const divider = Array(21).fill('<:iconetraitgris:1464522795009577010>').join('');

  const embed = new EmbedBuilder()
  .setTitle(`${categoryEmoji} ${name}`)
  .setColor(0xfde047)
  .setDescription(
    [
      `\`\`\`+${name}\`\`\``,
      config.description,
      '',
      `*Usage:* \`${config.usage}\``,
      '',
      `*Category:* **${config.category}**`,
      divider,
    ].join('\n')
  )
  .setFooter({ text: "Kian Canes Metaverse Manager" })
  .setTimestamp();

  await requestContext.message.reply({
    embeds: [embed],
  });

  
  logger.success(
    requestContext, 
    `"${requestContext.commandName}" successfully executed`
  );
}