import type { RequestContext } from "../../../../interfaces/RequestContext.js";

import type { LeaderboardCommand } from "../types/LeaderboardCommand.js";

export function parseLeaderboard(requestContext: RequestContext): LeaderboardCommand | null {
  const [...args] = requestContext.arguments;

  if (args.length === 0) {
    return { name: 'leaderboard', form: 'NO_ARGUMENTS' };
  }

  return null;
}
