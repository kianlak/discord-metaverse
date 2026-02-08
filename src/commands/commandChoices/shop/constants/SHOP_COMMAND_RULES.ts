import type { ShopCommandRule } from "../interfaces/ShopCommandRule.js";

import { CHANNELS } from "../../../../config/index.js";
import { BOLBI_SHOP_PROMPTS_SHOP } from "./prompts/BOLBI_SHOP_PROMPTS_SHOP.js";

export const SHOP_COMMAND_RULES: Partial<
  Record<string, ShopCommandRule>
> = {
  [CHANNELS.DEV_TEST]: {
    prompts: ["Command not recognized"],
  },

  [CHANNELS.BOLBI_SHOP]: {
    prompts: BOLBI_SHOP_PROMPTS_SHOP,
  },
};
