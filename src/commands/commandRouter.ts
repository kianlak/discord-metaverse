import { logger } from '../bot/logger/logger.js';

import type { RequestContext } from '../interfaces/RequestContext.js';

import { COMMAND_PREFIX } from '../bot/constants/COMMAND_PREFIX.js';
import { COMMANDS } from './commandRegistry.js';

export async function commandRouter(requestContext: RequestContext) {
  if (!requestContext.commandName) {
    logger.warn(requestContext, `No command supplied after prefix ${COMMAND_PREFIX}`);
    return;
  }

  const chosenCommand = COMMANDS[requestContext.commandName];
  const chosenCommandForm = chosenCommand.parse(requestContext);

  if (!chosenCommandForm) {
    await requestContext.message.reply(`Invalid usage. Try: ${chosenCommand.usage}`);
    return;
  }

  await chosenCommand.execute(chosenCommandForm, requestContext);
}
