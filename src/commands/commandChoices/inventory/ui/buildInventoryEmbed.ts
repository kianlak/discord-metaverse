import { EmbedBuilder } from "discord.js";

import type { UserContext } from "../../../../interfaces/UserContext.js";
import type { ItemType } from "../../../../items/types/ItemType.js";
import type { InventoryItem } from "../types/InventoryItems.js";
import { getItemById } from "../helpers/itemRegistry.js";

interface BuildInventoryEmbedInput {
  viewerId: string;
  targetUser: UserContext;
  selectedType?: ItemType;
  items: InventoryItem[];
}

const INVENTORY_TYPE_COLORS: Record<ItemType, number> = {
  KEY:        0xFFD700,
  CONSUMABLE: 0xFF4444,
  MATERIAL:   0x4CAF50,
};

const EMPTY_INVENTORY_COLOR = 0x95a5a6;

export function buildInventoryEmbed(
  input: BuildInventoryEmbedInput
) {
  const { viewerId, targetUser, selectedType, items } = input;

  const isSelf = viewerId === targetUser.id;

  const embed = new EmbedBuilder()
    .setTitle(
      isSelf
        ? "🎒 Your Inventory"
        : `🎒 ${targetUser.displayName ?? targetUser.name}'s Inventory`
    )
    .setThumbnail(targetUser.avatarURL ?? null)
    .setTimestamp();

  if (!selectedType) {
    embed
      .setColor(EMPTY_INVENTORY_COLOR)
      .setDescription(
        isSelf
          ? '📭 **Your inventory is empty**\n\nEarn items to view them here'
          : 'This user doesn\'t have any items yet'
      );

    return embed;
  }

  if (items.length === 0) {
    embed
      .setColor(INVENTORY_TYPE_COLORS[selectedType])
      .setDescription(
        isSelf
          ? `No **${selectedType}** items found.\n\nTry another category from the dropdown ⬇️`
          : `This user has no **${selectedType}** items.`
      )
      .setFooter({ text: `Category • ${selectedType}` });

    return embed;
  }

  const lines = items.map(entry => {
    const item = getItemById(entry.item_id);

    if (!item) {
      return `• **Unknown Item** x${entry.quantity}`;
    }

    return [
      `▸ ${item.item_name} x**${entry.quantity}** [\`${item.item_id}\`]`
    ].join("\n");
  });

  embed
    .setColor(INVENTORY_TYPE_COLORS[selectedType])
    .setDescription(lines.join("\n\n"))
    .setFooter({ text: 'Kian Canes Metaverse Manager' });

  return embed;
}
