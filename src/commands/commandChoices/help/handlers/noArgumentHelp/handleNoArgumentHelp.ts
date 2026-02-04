import { buildHelpCategoryEmbed } from "../../ui/buildHelpCategoryEmbed.js";
import { buildHelpCategorySelect } from "../../ui/buildHelpCategorySelect.js";
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
    buildHelpCategorySelect(DEFAULT_CATEGORY, requestContext.user.id),
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
}
