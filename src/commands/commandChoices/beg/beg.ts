import { handleBeg } from "./handlers/noArgumentBeg/handleNoArgumentsBeg.js";
import { logger } from "../../../bot/logger/logger.js";

import type { RequestContext } from "../../../interfaces/RequestContext.js";
import type { BegCommand } from "./types/BegCommand.js";

export async function executeBeg(command: BegCommand, requestContext: RequestContext) {
  switch (command.form) {
    case 'NO_ARGUMENTS': {
      logger.info(
        requestContext, 
        `Routing request of ${command.name} to form ${command.form}`
      );
      await handleBeg(requestContext);
      return;
    }
  }
}
