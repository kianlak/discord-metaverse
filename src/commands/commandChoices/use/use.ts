import { handleUse } from "./handlers/handleUse.js";
import { removeLiveRequest } from "../../../bot/infra/liveRequests.js";
import { logger } from "../../../bot/logger/logger.js";

import type { RequestContext } from "../../../interfaces/RequestContext.js";
import type { UseCommand } from "./types/UseCommand.js";

export async function executeUse(
  command: UseCommand,
  requestContext: RequestContext
) {
  let itemId: string;

  switch (command.form) {
    case 'ITEM_USE':
      itemId = command.item_id;

      logger.info(
        requestContext, 
        `Routing request of ${command.name} to form ${command.form}`
      );

      break;

    default:
      return;
  }

  await handleUse(
    requestContext,
    itemId,
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