import { handleHelpCategorySelect } from "../handlers/noArgumentHelp/helpers/handleHelpCategorySelect.js";

import type { Interaction } from "discord.js";

export async function helpInteractionRouter(interaction: Interaction) {
  if (interaction.isStringSelectMenu()) {
    switch (interaction.customId) {
      case 'help:select-category':
        await handleHelpCategorySelect(interaction);
        return;
    }
  }

  return;
}
