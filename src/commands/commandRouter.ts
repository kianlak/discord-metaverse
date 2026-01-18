import { logger } from '../bot/logger/logger.js';
import { getLiveRequestsFromUser } from '../bot/infra/liveRequests.js';

import type { RequestContext } from '../interfaces/RequestContext.js';

import { COMMAND_PREFIX } from '../bot/constants/COMMAND_PREFIX.js';
import { COMMANDS } from './constants/commandRegistry.js';

export async function commandRouter(requestContext: RequestContext) {
  if (!requestContext.commandName) {
    logger.warn(requestContext, `No command supplied after prefix ${COMMAND_PREFIX}`);
    return;
  }

  const chosenCommand = COMMANDS[requestContext.commandName];

  const hasActiveChosenCommand = getLiveRequestsFromUser(requestContext.user.id).some(
    liveRequestContext => liveRequestContext.commandName === requestContext.commandName
  );
  
  if (!chosenCommand.isPersistent && hasActiveChosenCommand) {
    await requestContext.message.reply(`⏳ Your previous "${chosenCommand}" command is still being processed...`);
    logger.warn(requestContext, `"${chosenCommand}" command is still in process...`);
    return;
  }

  const chosenCommandForm = chosenCommand.parse(requestContext);

  if (!chosenCommandForm) {
    await requestContext.message.reply(`❌ Invalid usage of "${requestContext.commandName}"\n\tTry: \`${chosenCommand.usage}\``);
    logger.warn(requestContext, `Invalid command usage`, { command: requestContext.commandName, arguments: requestContext.arguments });
    return;
  }

  try {
    logger.info(requestContext, `Executing "${requestContext.commandName}" command`);
    await chosenCommand.execute(chosenCommandForm, requestContext);
  } catch (error) {
    logger.error(requestContext, `Command "${requestContext.commandName}" failed`, error as Error);
    throw error;
  }
}