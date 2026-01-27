import { buildHelpCategoryEmbed } from "../../../ui/buildHelpCategoryEmbed.js";
import { buildHelpCategorySelect } from "../../../ui/buildHelpCategorySelect.js";
import { logger } from "../../../../../../bot/logger/logger.js";

import type { StringSelectMenuInteraction } from "discord.js";

export async function handleHelpCategorySelect(interaction: StringSelectMenuInteraction) {
  const selectedCategory = interaction.values[0];

  if (selectedCategory) {
    const embed = buildHelpCategoryEmbed(selectedCategory);
    const components = [buildHelpCategorySelect(selectedCategory)];

    logger.info(`[${interaction.user.username}] selected "${selectedCategory}" on Help Menu Dropdown`)

    await interaction.update({
      embeds: [embed],
      components,
    });
  }
  
  return;
}
