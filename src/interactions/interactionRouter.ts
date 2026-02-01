import { helpInteractionRouter } from "../commands/commandChoices/help/interactions/helpInteractionRouter.js";
import { profileInteractionRouter } from "../commands/commandChoices/profile/interactions/profileInteractionsRouter.js";
import { inventoryInteractionRouter } from "../commands/commandChoices/inventory/interactions/inventoryInteractionRouter.js";

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

    case 'profile':
      await profileInteractionRouter(interaction);
      return;

    case 'inventory':
      await inventoryInteractionRouter(interaction);
      return;

    default:
      return;
  }
}