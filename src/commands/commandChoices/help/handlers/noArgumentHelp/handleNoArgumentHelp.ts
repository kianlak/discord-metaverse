import { buildHelpCategoryEmbed } from "../../ui/buildHelpCategoryEmbed.js";
import { buildHelpCategorySelect } from "../../ui/buildHelpCategorySelect.js";
import { removeLiveRequest } from "../../../../../bot/infra/liveRequests.js";
import { buildThumbnailAttachments } from "../../../../../utils/setThumbnailImageFromPath.js";

import type { RequestContext } from "../../../../../interfaces/RequestContext.js";
import type { ThumbnailAttachable } from "../../../../../interfaces/ThumbnailAttachable.js";
import { getSystemPersona } from "../../../../../utils/getSystemPersona.js";
import { logger } from "../../../../../bot/logger/logger.js";

export async function handleNoArgumentHelp(requestContext: RequestContext) {
  const DEFAULT_CATEGORY = "General";
  const systemPersona = getSystemPersona();
  const embed = buildHelpCategoryEmbed(DEFAULT_CATEGORY);

  const components = [
    buildHelpCategorySelect(DEFAULT_CATEGORY),
  ];

  await requestContext.message.reply({
    embeds: [embed],
    components,
    files: [
      ...buildThumbnailAttachments({
      thumbnailUrl: systemPersona.thumbnailUrl,
      thumbnailAssetPath: systemPersona.thumbnailAssetPath
    } as ThumbnailAttachable)],
  });

  logger.success(
    requestContext, 
    `"${requestContext.commandName}" successfully executed`
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
