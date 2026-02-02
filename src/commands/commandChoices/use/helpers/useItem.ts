import { InventoryService } from "../../inventory/services/inventoryService.js";

import { removeLiveRequest } from "../../../../bot/infra/liveRequests.js";
import { getItemById } from "../../inventory/helpers/itemRegistry.js";
import { logger } from "../../../../bot/logger/logger.js";

import type { RequestContext } from "../../../../interfaces/RequestContext.js";

export async function useItem(params: {
  requestContext: RequestContext;
  itemId: string;
}) {
  const { requestContext, itemId } = params;
  const user = requestContext.user;

  const item = getItemById(itemId);
  if (!item) {
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
    throw new Error(`Item does not exist with item id: ${itemId}`);
  }

  const inventoryService = new InventoryService();

  const ownedQuantity = inventoryService.getUserItemQuantity(
    user.id,
    itemId
  );

  if (ownedQuantity <= 0) {
    throw new Error("You do not own this item.");
  }
  
  let alreadyUsed = false;

  if (item.item_type === "KEY") {
    alreadyUsed = inventoryService.hasUsedItem(
      user.id,
      itemId
    );

    if (alreadyUsed) {
      return { alreadyUsed: true };
    }
  }

  const shouldConsume = await item.use({
    user,
    requestContext,
  });

  if (item.item_type === "KEY") {
    inventoryService.markItemUsed(user.id, itemId);
    return { item, consumed: false };
  }

  if (shouldConsume === true) {
    inventoryService.decrementUserItem(user.id, itemId);
  }

  return {
    item,
    consumed: shouldConsume === true,
    alreadyUsed
  };
}
