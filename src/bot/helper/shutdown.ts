import { Client } from "discord.js";
import { initSqliteDB, shutdownSqliteDB } from "../infra/database/sqlite.js";
import { logger } from "../logger/logger.js";

let isShuttingDown = false;

export async function shutdown(
  client: Client,
  reason: string,
  error?: unknown
) {
  if (isShuttingDown) return;
  isShuttingDown = true;

  logger.warn(`Shutdown initiated: ${reason}`);

  if (error instanceof Error) {
    logger.error(`Shutdown reason error`, error);
  }

  shutdownSqliteDB();

  try {
    client.destroy();
    logger.success(`Shutdown successful`);
  } catch (destroyError) {
    logger.error(`Error while destroying Discord client`, destroyError as Error);
  } finally {
    process.exit(error ? 1 : 0);
  }
}
