import {
  ActionRowBuilder,
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
} from "discord.js";

import type { ItemType } from "../../../../items/types/ItemType.js";

import { ITEM_TYPES } from "../../../../items/constants/ITEM_TYPES.js";

export function buildShopItemTypeDropdown(
  selectedType: ItemType,
  userId: string,
) {
  return new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(
    new StringSelectMenuBuilder()
      .setCustomId(`shop:item-type:${userId}`)
      .setPlaceholder("Select item category")
      .addOptions(
        ITEM_TYPES.map(type =>
          new StringSelectMenuOptionBuilder()
            .setLabel(type)
            .setValue(type)
            .setDefault(type === selectedType)
        )
      )
  );
}