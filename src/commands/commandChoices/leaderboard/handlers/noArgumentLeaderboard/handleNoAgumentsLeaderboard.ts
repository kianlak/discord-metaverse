import { LeaderboardService } from "../../services/leaderboardService.js";

import { DiscordJsUserResolver } from "../../../../../utils/DiscordJsUserResolver.js";
import { buildLeaderboardImage } from "../../ui/buildLeaderboardImage.js";
import { hashLeaderboard } from "../../utils/hashLeaderboard.js";
import { removeLiveRequest } from "../../../../../bot/infra/liveRequests.js";
import { getCachedLeaderboardImage } from "../../utils/getCachedLeaderboardImage.js";
import { setCachedLeaderboardImage } from "../../utils/setCachedLeaderboardImage.js";
import { buildLeaderboardEmbed } from "../../ui/buildLeaderboardEmbed.js";
import { dedupeAttachments } from "../../../../../utils/dedupeAttachments.js";
import { buildThumbnailAttachments } from "../../../../../utils/setThumbnailImageFromPath.js";
import { logger } from "../../../../../bot/logger/logger.js";

import type { RequestContext } from "../../../../../interfaces/RequestContext.js";
import type { ThumbnailAttachable } from "../../../../../interfaces/ThumbnailAttachable.js";

export async function handleNoArgumentsLeaderboard(requestContext: RequestContext) {
  const resolver = new DiscordJsUserResolver();
  const leaderboardService = new LeaderboardService(undefined, resolver);

  const rawLeaderboardEntries = leaderboardService.getLeaderboardEntries(10);

  const userRank =
    rawLeaderboardEntries.findIndex(
      entry => entry.discordId === requestContext.user.id
    ) + 1;

  const userEntry = rawLeaderboardEntries[userRank - 1];

  const hash = hashLeaderboard(rawLeaderboardEntries);

  let imageBuffer = getCachedLeaderboardImage(hash);

  if (!imageBuffer) {
    logger.info(
      requestContext, 
      `No image in cache found, generating new image`
    );

    const leaderboardEntries = await leaderboardService.getBalehBucksLeaderboard(10);

    imageBuffer = await buildLeaderboardImage(leaderboardEntries);

    logger.info(
      requestContext, 
      `New image with hash of ${hash}, saved into cache`
    );

    setCachedLeaderboardImage(hash, imageBuffer);
  }

  const leaderboardEmbedContext = {
    username: requestContext.user.name,
    ...(userRank > 0 && { rank: userRank }),
    ...(userEntry && { balehBucks: userEntry.balehBucks }),
  };

  const {
    embed,
    leaderboardAttachment,
    personaThumbnail,
  } = buildLeaderboardEmbed(imageBuffer, leaderboardEmbedContext);

  const attachments = dedupeAttachments([
    leaderboardAttachment,
    ...buildThumbnailAttachments(
      personaThumbnail as ThumbnailAttachable
    ),
  ]);

  await requestContext.message.reply({
    embeds: [embed],
    files: attachments,
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
  
  return;
}
