import {
  ActionRowBuilder,
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
} from "discord.js";

import type { ItemType } from "../../../../items/types/ItemType.js";

const ITEM_TYPE_DISPLAY: Record<
  ItemType,
  { label: string; emoji: string }
> = {
  KEY: {
    label: "Key",
    emoji: "🔑",
  },
  CONSUMABLE: {
    label: "Consumables",
    emoji: "🧪",
  },
  MATERIAL: {
    label: "Materials",
    emoji: "🪵",
  },
};

export function buildInventoryDropdown(
  availableTypes: ItemType[],
  selectedType: ItemType,
  viewerId: string,
  targetUserId: string
) {
  const select = new StringSelectMenuBuilder()
    .setCustomId(`inventory:select:${viewerId}:${targetUserId}`)
    .setPlaceholder("Select a category")
    .addOptions(
      availableTypes.map(type => {
        const display = ITEM_TYPE_DISPLAY[type];

        return new StringSelectMenuOptionBuilder()
          .setLabel(display.label)
          .setValue(type)
          .setEmoji(display.emoji)
          .setDefault(type === selectedType);
      })
    );

  return new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(select);
}
