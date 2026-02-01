import type { UserContext } from "../../../../interfaces/UserContext.js";
import type { ItemType } from "../../../../items/types/ItemType.js";
import type { InventoryItem } from "../types/InventoryItems.js";
import { buildInventoryDropdown } from "./buildInventoryDropdown.js";
import { buildInventoryEmbed } from "./buildInventoryEmbed.js";

interface BuildInventoryViewInput {
  viewerId: string;
  targetUser: UserContext;
  selectedType?: ItemType;
  availableTypes: ItemType[];
  inventory: InventoryItem[];
}

export function buildInventoryView(input: BuildInventoryViewInput) {
  const {
    viewerId,
    targetUser,
    selectedType,
    availableTypes,
    inventory,
  } = input;

  if (availableTypes.length === 0 || !selectedType) {
    return {
      embeds: [
        buildInventoryEmbed({
          viewerId,
          targetUser,
          items: [],
        })
      ],
      components: [],
    };
  }

  const resolvedType: ItemType =
    availableTypes.includes(selectedType)
      ? selectedType
      : availableTypes[0]!;


  const itemsOfType = inventory.filter(
    item => item.item_type === resolvedType
  );

  return {
    embeds: [
      buildInventoryEmbed({
        viewerId,
        targetUser,
        selectedType: resolvedType,
        items: itemsOfType,
      }),
    ],
    components: [
      buildInventoryDropdown(
        availableTypes,
        resolvedType,
        viewerId,
        targetUser.id
      ),
    ],
  };
}
