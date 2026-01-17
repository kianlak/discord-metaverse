import type { RequestContext } from "../../../interfaces/RequestContext.js";
import type { BegCommand } from "../types/beg.types.js";

export function parseBeg(requestContext: RequestContext): BegCommand | null {
  const [...args] = requestContext.arguments;

  if (args.length === 0) {
    return { command: 'beg', form: 'NO_ARGUMENTS' };
  }

  return null;
}
