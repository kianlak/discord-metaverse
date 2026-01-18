import type { RequestContext } from "../../interfaces/RequestContext.js";
import type { BegCommand } from "./types/BegCommand.js";

export async function executeBeg(command: BegCommand, requestContext: RequestContext) {
  switch (command.form) {
    case 'NO_ARGUMENTS': {
      
      await requestContext.message.reply('You begged (self).');
      return;
    }
  }
}
