import type { RequestContext } from "../../../../interfaces/RequestContext.js";

import type { ShopCommand } from "../types/ShopComand.js";

export function parseShop(requestContext: RequestContext): ShopCommand | null {
  const [...args] = requestContext.arguments;

  if (args.length === 0) {
    return { name: 'shop', form: 'NO_ARGUMENTS' };
  }

  return null;
}
