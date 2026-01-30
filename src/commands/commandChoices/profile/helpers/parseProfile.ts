import type { RequestContext } from "../../../../interfaces/RequestContext.js";
import type { ProfileCommand } from "../types/ProfileCommand.js";

export function parseProfile(requestContext: RequestContext): ProfileCommand | null {
  const [...args] = requestContext.arguments;

  if (args.length === 0) {
    return { name: 'profile', form: 'NO_ARGUMENTS' };
  } else if (args.length === 1) {
    return { name: 'profile', form: 'TARGET_USER', targetUserId: args[0] ?? '' };
  }

  return null;
}
