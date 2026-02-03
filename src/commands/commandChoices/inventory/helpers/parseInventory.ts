import type { RequestContext } from "../../../../interfaces/RequestContext.js";
import type { InventoryCommand } from "../types/CommandDefinitionInventory.js";

export function parseInventory(requestContext: RequestContext): InventoryCommand | null {
  const [...args] = requestContext.arguments;

  if (args.length === 0) {
    return { name: 'inventory', form: 'NO_ARGUMENTS' };
  } else if (args.length === 1) {

    if (/^\d+$/.test(args[0] ?? '')) {
      return {
        name: "inventory",
        form: "TARGET_USER",
        targetUserId: args[0] ?? '',
      };
    } else {
      return {
        name: "inventory",
        form: "ITEM_INFO",
        itemId: args[0] ?? '',
      };
    }
  }

  return null;
}
