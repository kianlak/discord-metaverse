import type { RequestContext } from "../../interfaces/RequestContext.js";
import type { UserContext } from "../../interfaces/UserContext.js";
import type { ItemRarity } from "../types/ItemRarity.js";
import type { ItemType } from "../types/ItemType.js";

export interface ItemDefinition {
  item_id: string;
  item_name: string;
  description: string;
  value: number;
  item_type: ItemType;
  rarity: ItemRarity;
  sellable: boolean;
  tradable: boolean;

  use: (context: {
    user: UserContext;
    requestContext: RequestContext;
    quantity: number;
  }) => Promise<void> | void;
}
