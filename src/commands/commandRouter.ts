import { addLiveRequest, getLiveRequestsFromUser, removeLiveRequest } from '../bot/infra/liveRequests.js';
import { handleUnknownCommand } from './commandChoices/unknownCommand/handlers/handleUnknownCommand.js';
import { getSystemPersona } from '../utils/getSystemPersona.js';
import { buildAllowedChannelsListEmbed } from './ui/buildAllowedChannelsListEmbed.js';
import { buildThumbnailAttachments } from '../utils/setThumbnailImageFromPath.js';
import { buildCommandIsStillProcessingEmbed } from './ui/buildCommandIsStillProcessingEmbed.js';
import { buildInvalidUsageEmbed } from './ui/buildInvalidUsageEmbed.js';
import { getCommand } from './helpers/getComand.js';
import { logger } from '../bot/logger/logger.js';

import type { RequestContext } from '../interfaces/RequestContext.js';
import type { ThumbnailAttachable } from '../interfaces/ThumbnailAttachable.js';
import type { CommandMap } from './types/CommandMap.js';

import { COMMAND_PREFIX } from '../bot/constants/COMMAND_PREFIX.js';
import { COMMANDS } from './constants/commandRegistry.js';

export async function commandRouter(requestContext: RequestContext) {
  const systemPersona = getSystemPersona();

  if (!requestContext.commandName) {
    const content = requestContext.message.content.trim();

    if (content.length <= 1) {
      logger.warn(
        requestContext, 
        `No command supplied after prefix ${COMMAND_PREFIX}`
      );
      return;
    }

    logger.warn(
      requestContext, 
      `Unrecognized command, routing to unknown command handler`, {
      content: requestContext.message.content
    });

    handleUnknownCommand(requestContext);
    return;
  }

  const chosenCommand = COMMANDS[requestContext.commandName];

  const hasActiveChosenCommand = getLiveRequestsFromUser(requestContext.user.id).some(
    liveRequestContext => liveRequestContext.commandName === requestContext.commandName
  );

  if (
    chosenCommand.allowedChannelIds &&
    !chosenCommand.allowedChannelIds.includes(requestContext.channelId)
  ) {
    const allowedChannelsList = chosenCommand.allowedChannelIds
      .map(id => `<#${id}>`)
      .join(', ');

    await requestContext.message.reply({
      embeds: [buildAllowedChannelsListEmbed(systemPersona, allowedChannelsList)],
      files: buildThumbnailAttachments({
        thumbnailUrl: systemPersona.thumbnailUrl,
        thumbnailAssetPath: systemPersona.thumbnailAssetPath
      } as ThumbnailAttachable),
    });
    
    logger.warn(
      requestContext, 
      `Requested command in the wrong channel`, 
      {
        channelname: requestContext.channelName,
        channelId: requestContext.channelId, 
        command: requestContext.commandName, 
        arguments: requestContext.arguments 
      }
    );

    return;
  }
  
  if (!chosenCommand.isPersistent && hasActiveChosenCommand) {
    await requestContext.message.reply({
      embeds: [buildCommandIsStillProcessingEmbed(systemPersona, requestContext.commandName)],
      files: buildThumbnailAttachments({
        thumbnailUrl: systemPersona.thumbnailUrl,
        thumbnailAssetPath: systemPersona.thumbnailAssetPath
      } as ThumbnailAttachable),
    });

    logger.warn(
      requestContext, 
      `"${requestContext.commandName}" command is still in process...`
    );
    return;
  }

  const chosenCommandForm = chosenCommand.parse(requestContext);

  if (!chosenCommandForm) {
    await requestContext.message.reply({
      embeds: [
        buildInvalidUsageEmbed(
          systemPersona, 
          requestContext.commandName,
          chosenCommand.usage
        )
      ],
      files: buildThumbnailAttachments({
        thumbnailUrl: systemPersona.thumbnailUrl,
        thumbnailAssetPath: systemPersona.thumbnailAssetPath
      } as ThumbnailAttachable),
    });

    logger.warn(
      requestContext, 
      `Invalid command usage`, 
      { 
        command: requestContext.commandName, 
        arguments: requestContext.arguments 
      }
    );

    return;
  }

  try {
    logger.info(
      requestContext, 
      `Executing "${requestContext.commandName}" command`
    );

    addLiveRequest(requestContext.user.id, requestContext);

    const commandName = requestContext.commandName as keyof CommandMap;
    const chosenCommand = getCommand(commandName);
    if (commandName === 'shop') return;
    await chosenCommand.execute(chosenCommandForm, requestContext);
  } catch (error) {
    logger.error(
      requestContext, 
      `Command "${requestContext.commandName}" failed`, 
      error as Error
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
}