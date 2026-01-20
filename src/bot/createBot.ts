import 'dotenv/config';
import { createClient } from "./client/createClient.js";
import { registerClientEvents } from './client/registerClientEvents.js';
import { shutdown } from './helper/shutdown.js';
import { initSqliteDB } from './infra/database/sqlite.js';
import { logger } from './logger/logger.js';

import { DISCORD_BOT_TOKEN } from '../config/index.js';

const client = createClient();

export async function createBot() {
  logger.info(`Creating bot`);

  try {
    registerClientEvents(client);
    
    logger.info(`Bot client connecting to Discord`);
    await client.login(DISCORD_BOT_TOKEN);
  
    client.once('clientReady', async () => {
      initSqliteDB();
      // await onReady(client);
    });

    logger.success(`Bot created successfully`);
  } catch(error) {
    logger.error(`Failed to start bot`, error as Error);
  }
}

// SHUTDOWN HANDLING //

process.on('SIGINT', () => {
  shutdown(
    client, 
    'SIGINT (Ctrl+C)'
  );
});

process.on('SIGTERM', () => {
  shutdown(
    client, 
    'SIGTERM (Process termination)'
  );
});

process.on('unhandledRejection', (reason) => {
  shutdown(
    client, 
    'unhandledRejection', 
    reason instanceof Error ? reason : new Error(String(reason))
  );
});

process.on('uncaughtException', (error) => {
  shutdown(
    client, 
    'uncaughtException', 
    error
  );
});