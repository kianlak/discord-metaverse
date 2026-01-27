import { handleCommandInfoHelp } from "./handlers/commandInfoHelp/handleCommandInfoHelp.js";
import { handleNoArgumentHelp } from "./handlers/noArgumentHelp/handleNoArgumentHelp.js";
import { logger } from "../../../bot/logger/logger.js";

import type { RequestContext } from "../../../interfaces/RequestContext.js";
import type { HelpCommand } from "./types/HelpCommand.js";

export async function executeHelp(command: HelpCommand, requestContext: RequestContext) {
  switch (command.form) {
    case 'NO_ARGUMENTS': {
      logger.info(
        requestContext, 
        `Routing request of ${command.name} to form ${command.form}`
      );
      await handleNoArgumentHelp(requestContext);
      return;
    }

    case 'COMMAND_INFO': {
      logger.info(
        requestContext, 
        `Routing request of ${command.name} to form ${command.form} with payload`,
        { commandName: command.commandName }
      );
      await handleCommandInfoHelp(requestContext, command.commandName);
      return;
    }
  }
}
