import { LeaderboardService } from "../../services/leaderboardService.js";

import { AttachmentBuilder, EmbedBuilder } from "discord.js";
import { DiscordJsUserResolver } from "../../../../../utils/DiscordJsUserResolver.js";
import { buildLeaderboardImage } from "../../ui/buildLeaderboardImage.js";
import { hashLeaderboard } from "../../utils/hashLeaderboard.js";
import { removeLiveRequest } from "../../../../../bot/infra/liveRequests.js";
import { getCachedLeaderboardImage } from "../../utils/getCachedLeaderboardImage.js";
import { setCachedLeaderboardImage } from "../../utils/setCachedLeaderboardImage.js";

import type { RequestContext } from "../../../../../interfaces/RequestContext.js";
import { logger } from "../../../../../bot/logger/logger.js";

export async function handleNoArgumentsLeaderboard(requestContext: RequestContext) {
  const resolver = new DiscordJsUserResolver();
  const leaderboardService = new LeaderboardService(undefined, resolver);

  const rawLeaderboardEntries = leaderboardService.getLeaderboardEntries(10);

  const hash = hashLeaderboard(rawLeaderboardEntries);

  let imageBuffer = getCachedLeaderboardImage(hash);

  if (!imageBuffer) {
    logger.info(requestContext, `No image in cache found, generating new image`);
    const leaderboardEntries = await leaderboardService.getBalehBucksLeaderboard(10);

    imageBuffer = await buildLeaderboardImage(leaderboardEntries);

    logger.info(requestContext, `New image with hash of ${hash}, saved into cache`);
    setCachedLeaderboardImage(hash, imageBuffer);
  }

  const attachment = new AttachmentBuilder(imageBuffer, {
    name: 'baleh-leaderboard.png',
  });

  const embed = new EmbedBuilder()
    .setColor(0xfde047)
    .setImage("attachment://baleh-leaderboard.png")
    .setFooter({ text: "Kian Canes Metaverse Manager" })
    .setTimestamp();

  await requestContext.message.reply({
    embeds: [embed],
    files: [attachment],
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
