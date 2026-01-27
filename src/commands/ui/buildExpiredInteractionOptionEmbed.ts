import { EmbedBuilder } from "discord.js";

import type { Interaction } from "discord.js";

export async function buildExpiredInteractionOptionEmbed(interaction: Interaction) {
  if (!interaction.isRepliable()) return;

  const embed = new EmbedBuilder()
    .setTitle(`⏳ Menu Expired`)
    .setDescription(`This menu is no longer active`)
    .setColor(0xef4444)
    .setTimestamp();

  if (interaction.replied || interaction.deferred) {
    await interaction.followUp({
      embeds: [embed],
      ephemeral: true
    });
    return;
  }

  await interaction.reply({
    embeds: [embed],
    ephemeral: true
  });
}
