import { ShopSessionStore } from "../shopSessions.js";
import { getLiveRequestsFromUser } from "../../../../bot/infra/liveRequests.js";
import { buildShopBuyEmbed } from "../ui/buildShopBuyEmbed.js";
import { getBuyableItemsByType } from "../utils/getBuyableItems.js";
import { buildShopItemTypeDropdown } from "../ui/buildShopItemTypeDropdown.js";
import { buildShopBuyButtons } from "../ui/buildShopBuyButtons.js";
import { logger } from "../../../../bot/logger/logger.js";

import type { ButtonInteraction } from "discord.js";

export async function handleShopWelcomeButtons(interaction: ButtonInteraction) {
  const [, action, ownerId] = interaction.customId.split(':');
  const userId = interaction.user.id;

  const requestContext = getLiveRequestsFromUser(userId).filter(
    request => request.commandName === "shop"
  )[0];

  if (!requestContext) return;

  const session = ShopSessionStore.get(userId);

  if (!session) {
    await interaction.reply({
      content: "❌ You don't have an active shop session",
      ephemeral: true,
    });
    return;
  }

  if (interaction.user.id !== ownerId) {
    await interaction.reply({
      content: `❌ You can't interact with someone else's shop menu`,
      ephemeral: true,
    });
    return;
  }

  await interaction.deferUpdate();

  if (action === "buy") {
    logger.info(
      requestContext ?? { userId },
      "Shop welcome: user selected BUY"
    );

    const items = getBuyableItemsByType("CONSUMABLE");

    await interaction.message.edit({
      embeds: [buildShopBuyEmbed(items)],
      files: [],
      components: [
        buildShopItemTypeDropdown("CONSUMABLE", ownerId),
        buildShopBuyButtons(userId),
      ],
    });
  }

  if (action === "sell") {
    logger.info(
      requestContext ?? { userId },
      "Shop welcome: user selected SELL"
    );
    // still no-op
  }
}

