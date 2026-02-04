import { buildHelpCategoryEmbed } from "../../../ui/buildHelpCategoryEmbed.js";
import { buildHelpCategorySelect } from "../../../ui/buildHelpCategorySelect.js";
import { logger } from "../../../../../../bot/logger/logger.js";

import type { StringSelectMenuInteraction } from "discord.js";

export async function handleHelpCategorySelect(interaction: StringSelectMenuInteraction) {
  const [, , ownerId] = interaction.customId.split(':');
  const selectedCategory = interaction.values[0];

  if (interaction.user.id !== ownerId) {
    await interaction.reply({
      content: `❌ You can't interact with someone else's help menu`,
      ephemeral: true,
    });
    return;
  }

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
