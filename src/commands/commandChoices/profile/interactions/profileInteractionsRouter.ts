import { handleProfileCategorySelect } from "../helpers/handleProfileCategorySelect.js";

import type { Interaction } from "discord.js";

export async function profileInteractionRouter(
  interaction: Interaction
) {
  if (!interaction.isStringSelectMenu()) return;

  const [, action] = interaction.customId.split(':');

  switch (action) {
    case 'menu':
      await handleProfileCategorySelect(interaction);
      return;

    default:
      return;
  }
}
