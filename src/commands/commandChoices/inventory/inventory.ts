import { removeLiveRequest } from "../../../bot/infra/liveRequests.js";
import { handleInventory } from "./handlers/handleInventory.js";
import { logger } from "../../../bot/logger/logger.js";

import type { RequestContext } from "../../../interfaces/RequestContext.js";
import type { InventoryCommand } from "./types/CommandDefinitionInventory.js";

export async function executeInventory(
  command: InventoryCommand,
  requestContext: RequestContext
) {
  let targetUserId: string;

  switch (command.form) {
    case 'NO_ARGUMENTS':
      targetUserId = requestContext.user.id;

      logger.info(
        requestContext, 
        `Routing request of ${command.name} to form ${command.form}`
      );

      break;

    case 'TARGET_USER':
      targetUserId = command.targetUserId;

      logger.info(
        requestContext, 
        `Routing request of ${command.name} to form ${command.form} with payload`,
        { commandName: command.targetUserId }
      );

      break;

    default:
      return;
  }

  await handleInventory(
    requestContext,
    targetUserId
  );

  logger.info(
    requestContext,
    `Removing user ${requestContext.user.name}'s live request from set`,
    { 
      userId: requestContext.user.id,
      requestId: requestContext.requestId,
      channelName: requestContext.channelId,
      commandName: requestContext.commandName,
      arguments: requestContext.arguments
    }
  );

  removeLiveRequest(requestContext.user.id, requestContext.commandName);
}