import { buildBegCooldownEmbed } from "../../../ui/buildBegCooldownEmbed.js";
import { buildThumbnailAttachments } from "../../../../../../utils/setThumbnailImageFromPath.js";
import { msToDuration } from "../../../../../../utils/msToDuration.js";
import { logger } from "../../../../../../bot/logger/logger.js";

import type { RequestContext } from "../../../../../../interfaces/RequestContext.js";
import type { BegCommandConfig } from "../../../interfaces/BegCommandConfig.js";
import type { ThumbnailAttachable } from "../../../../../../interfaces/ThumbnailAttachable.js";
import type { BegCooldownResult } from "../../../types/BegCooldownResults.js";

export async function handleBegCooldown(
  requestContext: RequestContext,
  begCommandConfig: BegCommandConfig,
  begResult: BegCooldownResult
) {
  await requestContext.message.reply({
    embeds: [buildBegCooldownEmbed(begCommandConfig, begResult)],
    files: buildThumbnailAttachments({
      thumbnailUrl: begCommandConfig.thumbnailUrl,
      thumbnailAssetPath: begCommandConfig.thumbnailAssetPath
    } as ThumbnailAttachable),
  });

  logger.warn(
    requestContext, 
    `User could not "${requestContext.commandName}", cooldown for ${msToDuration(begResult.timeRemainingInMs, 'SECONDS')} second(s)`
  );
}