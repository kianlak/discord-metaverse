import { handleNoArgumentsLeaderboard } from "./handlers/noArgumentLeaderboard/handleNoAgumentsLeaderboard.js";
import { logger } from "../../../bot/logger/logger.js";

import type { RequestContext } from "../../../interfaces/RequestContext.js";
import type { LeaderboardCommand } from "./types/LeaderboardCommand.js";

export async function executeLeaderboard(command: LeaderboardCommand, requestContext: RequestContext) {
  switch (command.form) {
    case 'NO_ARGUMENTS': {
      logger.info(
        requestContext, 
        `Routing request of ${command.name} to form ${command.form}`
      );
      await handleNoArgumentsLeaderboard(requestContext);
      return;
    }
  }
}
