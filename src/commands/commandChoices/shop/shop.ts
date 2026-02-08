import { logger } from "../../../bot/logger/logger.js";

import type { RequestContext } from "../../../interfaces/RequestContext.js";
import { handleNoArgumentHelp } from "./handlers/handleNoArgumentShop/handleNoArgumentShop.js";
import type { ShopCommand } from "./types/ShopComand.js";

export async function executeShop(
  command: ShopCommand,
  requestContext: RequestContext
) {
  switch (command.form) {
      case 'NO_ARGUMENTS': {
        logger.info(
          requestContext, 
          `Routing request of ${command.name} to form ${command.form}`
        );
        await handleNoArgumentHelp(requestContext);
        return;
      }
    }
}