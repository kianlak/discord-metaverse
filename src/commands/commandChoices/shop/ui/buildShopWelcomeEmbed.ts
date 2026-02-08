import { EmbedBuilder } from "discord.js";
import { getBolbiPersona } from "../../../../utils/getBolbiPersona.js";
import { selectRandomPrompt } from "../../unknownCommand/utils/selectRandomPrompt.js";

import type { ShopCommandConfig } from "../interfaces/ShopCommandConfig.js";

export function buildShopWelcomeEmbed(shopCommandConfig: ShopCommandConfig) {
  const selectedPrompt = selectRandomPrompt(shopCommandConfig);
  const bolbiPersona = getBolbiPersona();

  const embed = new EmbedBuilder()
    .setColor(0xff4d8d)
    .setTitle("🛒 Bolbi's Shop")
    .setDescription(
      `\`\`\`${selectedPrompt}\`\`\``
    )
    .setFooter({ text: `${bolbiPersona.footer}` })
    .setTimestamp();

  if (shopCommandConfig.thumbnailUrl) {
    embed.setThumbnail(shopCommandConfig.thumbnailUrl);
  }

  return embed;
}
