import type { BegCommandRule } from "../interfaces/BegCommandRule.js";

import { 
  BOLBI_SHOP_PROMPTS_BEG 
} from "./prompts/BOLBI_SHOP_PROMPTS_BEG.js";
import { CHANNELS } from "../../../../config/index.js";

export const BEG_COMMAND_RULES: Partial<
  Record<string, BegCommandRule>
> = {
  [CHANNELS.DEV_TEST]: {
    prompts: ["Command not recognized"],
  },

  [CHANNELS.BOLBI_SHOP]: {
    prompts: BOLBI_SHOP_PROMPTS_BEG,
  },
};
