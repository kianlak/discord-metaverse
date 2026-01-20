import { Client } from "discord.js";
import { handleMessageCommandEntry } from "./handlers/handleMessageCommandEntry.js";
import { logger } from "../logger/logger.js";

export function registerClientEvents(client: Client) {
  logger.info(`Registering event listeners`);

  client.on('messageCreate', handleMessageCommandEntry);
  client.on('interactionCreate', () => {});

  logger.success(`Listeners registered`);
}