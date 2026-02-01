import { handleInventoryDropdown } from "../handlers/handleInventoryDropdown.js";

import type { Interaction } from "discord.js";

export async function inventoryInteractionRouter(
  interaction: Interaction
) {
  if (!interaction.isStringSelectMenu()) return;

  const [, action] = interaction.customId.split(':');
  
  switch (action) {
    case 'select':
      await handleInventoryDropdown(interaction);
      return;

    default:
      return;
  }
}
