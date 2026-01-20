import { getSystemPersona } from "../../../../../../utils/getSystemPersona.js";
import { dedupeAttachments } from "../../../../../../utils/dedupeAttachments.js";
import { buildThumbnailAttachments } from "../../../../../../utils/setThumbnailImageFromPath.js";
import { buildBegSuccessEmbed } from "../../../ui/buildSuccessBegEmbed.js";
import { logger } from "../../../../../../bot/logger/logger.js";

import type { RequestContext } from "../../../../../../interfaces/RequestContext.js";
import type { BegCommandConfig } from "../../../interfaces/BegCommandConfig.js";
import type { ThumbnailAttachable } from "../../../../../../interfaces/ThumbnailAttachable.js";
import type { BegSuccessResult } from "../../../types/BegSuccessResult.js";

export async function handleBegSuccess(
  requestContext: RequestContext,
  begCommandConfig: BegCommandConfig,
  begResult: BegSuccessResult
) {
  const systemPersona = getSystemPersona();

  const attachments = dedupeAttachments([
    ...buildThumbnailAttachments({
      thumbnailUrl: begCommandConfig.thumbnailUrl,
      thumbnailAssetPath: begCommandConfig.thumbnailAssetPath
    } as ThumbnailAttachable),
    
    ...buildThumbnailAttachments({
      thumbnailUrl: systemPersona.thumbnailUrl,
      thumbnailAssetPath: systemPersona.thumbnailAssetPath
    } as ThumbnailAttachable)
  ]);

  await requestContext.message.reply({
    embeds: buildBegSuccessEmbed(begCommandConfig, begResult),
    files: attachments
  });


  logger.success(
    requestContext, 
    `"${requestContext.commandName}" successfully executed. Result:`, 
    {
      reward: begResult.reward,
      rewardFromAchievement: begResult.rewardFromAchievement,
      newBalance: begResult.newBalance,
    }
  );
}