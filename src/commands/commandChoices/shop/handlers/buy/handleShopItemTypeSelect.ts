import type { StringSelectMenuInteraction } from "discord.js";

import { ShopSessionStore } from "../../shopSessions.js";
import { buildShopBuyEmbed } from "../../ui/buildShopBuyEmbed.js";
import { buildShopItemTypeDropdown } from "../../ui/buildShopItemTypeDropdown.js";
import { getBuyableItemsByType } from "../../utils/getBuyableItems.js";

import type { ItemType } from "../../../../../items/types/ItemType.js";

export async function handleShopItemTypeSelect(
  interaction: StringSelectMenuInteraction
) {
  const userId = interaction.user.id;
  const selectedType = interaction.values[0] as ItemType;

  if (!selectedType) return;

  const session = ShopSessionStore.get(userId);

  if (!session) {
    await interaction.reply({
      content: "❌ You don't have an active shop session.",
      ephemeral: true,
    });
    return;
  }

  if (session.userId !== userId) {
    await interaction.reply({
      content: "❌ This shop session isn't yours.",
      ephemeral: true,
    });
    return;
  }

  await interaction.deferUpdate();

  const items = getBuyableItemsByType(selectedType);

  await interaction.message.edit({
    embeds: [buildShopBuyEmbed(items)],
    components: [buildShopItemTypeDropdown(selectedType, userId)],
  });
}
