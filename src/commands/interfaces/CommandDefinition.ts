import type { RequestContext } from "../../interfaces/RequestContext.js";
import type { BaseCommandForm } from "./BaseCommandForm.js";

export interface CommandDefinition<TParsedCommand extends BaseCommandForm> {
  parse(requestContext: RequestContext): TParsedCommand | null;
  execute(command: BaseCommandForm, requestContext: RequestContext): Promise<void>;
  usage: string;
  description: string;
  allowedChannelIds?: string[];
  category: string,
  isPersistent: boolean;
}
