import type { RequestContext } from "../../../../interfaces/RequestContext.js";
import type { HelpCommand } from "../types/HelpCommand.js";

export function parseHelp(requestContext: RequestContext): HelpCommand | null {
  const [...args] = requestContext.arguments;

  if (args.length === 0) {
    return { name: 'help', form: 'NO_ARGUMENTS' };
  } else if (args.length === 1) {
    return { name: 'help', form: 'COMMAND_INFO', commandName: args[0] ?? '' };
  }

  return null;
}
