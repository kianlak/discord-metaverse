import type { RequestContext } from "../../../../interfaces/RequestContext.js";
import type { UseCommand } from "../types/UseCommand.js";

export function parseUse(requestContext: RequestContext): UseCommand | null {
  const [...args] = requestContext.arguments;

  if (args.length === 1) {
    return { name: 'use', form: 'ITEM_USE', item_id: args[0] ?? '' };
  }

  return null;
}
