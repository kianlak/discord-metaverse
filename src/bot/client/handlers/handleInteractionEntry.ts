import { userBootstrap } from "../../infra/bootstrap/userBootstrap.js";
import { userContextFromInteraction } from "../../helper/userContextFromInteraction.js";
import { isUserEnsured } from "../../infra/ensuredUsers.js";
import { interactionRouter } from "../../../interactions/interactionRouter.js";
import { logger } from "../../logger/logger.js";

import type { Interaction } from "discord.js";
import type { UserContext } from "../../../interfaces/UserContext.js";

import { VALID_CHANNELS } from "../../../config/channels.js";


export async function handleInteractionEntry(interaction: Interaction) {
  let user;

  try {
    if (interaction.channelId && !VALID_CHANNELS.has(interaction.channelId)) return;

    user = userContextFromInteraction(interaction) as UserContext;
    if (!user) return;

    if (!isUserEnsured(user.id)) userBootstrap(user);

    await interactionRouter(interaction);
  } catch (error) {
    logger.error(`[${user?.name}] Interaction failed for interaction id ${error}`);

    if (interaction.isRepliable() && !interaction.replied) {
      await interaction.reply({
        content: "❌ Something went wrong while handling this interaction",
        ephemeral: true,
      });
    }
  }
}
