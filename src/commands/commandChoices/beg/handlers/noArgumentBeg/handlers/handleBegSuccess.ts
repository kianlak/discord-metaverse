import { AchievementService } from "../../../../../../core/Achievements/services/AchievementService.js";

import { getSystemPersona } from "../../../../../../utils/getSystemPersona.js";
import { dedupeAttachments } from "../../../../../../utils/dedupeAttachments.js";
import { buildAchievementUnlockedEmbed } from "../../../../../../core/Achievements/ui/buildAchievementUnlockEmbed.js";
import { buildThumbnailAttachments } from "../../../../../../utils/setThumbnailImageFromPath.js";
import { buildBegSuccessEmbed } from "../../../ui/buildSuccessBegEmbed.js";
import { logger } from "../../../../../../bot/logger/logger.js";

import type { RequestContext } from "../../../../../../interfaces/RequestContext.js";
import type { BegCommandConfig } from "../../../interfaces/BegCommandConfig.js";
import type { ThumbnailAttachable } from "../../../../../../interfaces/ThumbnailAttachable.js";
import type { BegSuccessResult } from "../../../types/BegSuccessResult.js";

import { ACHIEVEMENTS } from "../../../../../../core/Achievements/constants/ACHIEVEMENTS.js";
import { BegService } from "../../../services/BegService.js";
import { UserService } from "../../../../../../core/User/services/UserService.js";

export async function handleBegSuccess(
  requestContext: RequestContext,
  begCommandConfig: BegCommandConfig,
  begResult: BegSuccessResult
) {
  const achievementService = new AchievementService();
  
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
      newBalance: begResult.newBalance,
      multiplier: begResult.multiplier,
    }
  );

  const awarded = achievementService.evaluateAndAward(
    requestContext.user.id,
    'beg:success'
  );

  for (const award of awarded) {
    const achievement = ACHIEVEMENTS.find(
      a => a.id === award.achievementId
    );

    if (!achievement) continue;
    
    const userService = new UserService();
    const begService = new BegService(userService);
    const userId = requestContext.user.id;
    const currBeg = begService.getTotalBegs(userId);
    
    if (award.tier === 4) begService.setAchievementTierFourBegNumber(userId, currBeg);

    await requestContext.message.reply({
      embeds: [
        buildAchievementUnlockedEmbed(
          achievement.name,
          award.tier,
          award.tierDescription
        ),
      ],
      files: [
        `${achievement.badgeBasePath}/tier-${award.tier}.png`,
      ],
    });

    logger.info(
      requestContext, 
      `User has achieved ${achievement.name} Tier ${award.tier}`
    );
  }
}