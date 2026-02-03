import type { RequestContext } from "../../interfaces/RequestContext.js";
import type { UserContext } from "../../interfaces/UserContext.js";
import type { ItemRarity } from "../types/ItemRarity.js";
import type { ItemType } from "../types/ItemType.js";

export interface ItemDefinition {
  item_id: string;
  item_name: string;
  description: string;
  item_type: ItemType;
  rarity: ItemRarity;
  itemBasePath: string;
  sellable: boolean;
  buyable: boolean;
  tradable: boolean;
  oneTimeBuy: boolean;
  value?: number;
  sellPrice?: number;
  maxBuyableDaily?: number;
  maxBuyableWeekly?: number;
  maxBuyableMonthly?: number;

  use: (context: {
    user: UserContext;
    requestContext: RequestContext;
  }) => Promise<boolean> | boolean;
}
