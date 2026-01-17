import type { RequestContext } from "../../interfaces/RequestContext.js";

export interface CommandDefinition<TParsedCommand> {
  parse(requestContext: RequestContext): TParsedCommand | null;
  execute(command: TParsedCommand, requestContext: RequestContext): Promise<void>;
  usage: string;
  description: string;
}
