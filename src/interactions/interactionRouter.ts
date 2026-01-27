import { helpInteractionRouter } from "../commands/commandChoices/help/interactions/helpInteractionRouter.js";

import type { Interaction } from "discord.js";

export async function interactionRouter(interaction: Interaction) {
  if (
    !interaction.isStringSelectMenu() &&
    !interaction.isButton() &&
    !interaction.isModalSubmit()
  ) {
    return;
  }

  const [domain] = interaction.customId.split(':');

  switch (domain) {
    case 'help':
      await helpInteractionRouter(interaction);
      return;


    default:
      return;
  }
}