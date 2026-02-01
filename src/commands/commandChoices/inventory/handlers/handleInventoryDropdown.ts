import { InventoryService } from "../services/inventoryService.js";
import { getAvailableItemTypes } from "../helpers/getAvailableItemTypes.js";
import { buildInventoryView } from "../ui/buildInventoryView.js";

import type { StringSelectMenuInteraction } from "discord.js";
import type { ItemType } from "../../../../items/types/ItemType.js";
import type { UserContext } from "../../../../interfaces/UserContext.js";
import { getDiscordClient } from "../../../../bot/client/registerDiscordClient.js";
import { logger } from "../../../../bot/logger/logger.js";

export async function handleInventoryDropdown(interaction: StringSelectMenuInteraction) {
  if (!interaction.customId.startsWith("inventory:select")) return;

  const [, ,viewerId, targetUserId] = interaction.customId.split(":");

  if (interaction.user.id !== viewerId) {
    await interaction.reply({
      content: `❌ You can't interact with someone else's profile`,
      ephemeral: true,
    });
    return;
  }

  if (!targetUserId) return;

  const selectedType = interaction.values[0] as ItemType;

  const inventoryService = new InventoryService();
  const inventory = inventoryService.getUserInventory(targetUserId);
  const availableTypes = getAvailableItemTypes(inventory);

  const resolvedSelectedType = availableTypes.includes(selectedType)
    ? selectedType
    : availableTypes[0];

  const client = getDiscordClient();
  const user = await client.users.fetch(targetUserId);

  const targetUser: UserContext = {
    id: user.id,
    name: user.username,
    displayName: user.displayName,
    avatarURL: user.avatarURL(),
    avatarDecorationURL: user.avatarDecorationURL(),
    bannerURL: user.bannerURL(),
  };

  logger.info(
    `[${user.username}] Selected to view "${selectedType}"`
  );

  const view = buildInventoryView({
    viewerId,
    targetUser,
    availableTypes,
    inventory,
    ...(resolvedSelectedType
      ? { selectedType: resolvedSelectedType }
      : {}),
  });

  await interaction.update(view);
}
