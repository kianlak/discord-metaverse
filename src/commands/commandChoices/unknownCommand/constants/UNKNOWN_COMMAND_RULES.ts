import type { UnknownCommandRule } from "../interfaces/UnknownCommandRule.js";

import { 
  BOLBI_SHOP_PROMPTS_UNKNOWN_COMMAND 
} from "./prompts/BOLBI_SHOP_PROMPTS_UNKNOWN_COMMAND.js";
import { CHANNELS } from "../../../../config/index.js";

export const UNKNOWN_COMMAND_RULES: Partial<
  Record<string, UnknownCommandRule>
> = {
  [CHANNELS.DEV_TEST]: {
    prompts: ["Command not recognized"],
  },

  [CHANNELS.BOLBI_SHOP]: {
    prompts: BOLBI_SHOP_PROMPTS_UNKNOWN_COMMAND,
  },
};
