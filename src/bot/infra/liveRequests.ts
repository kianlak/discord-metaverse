import type { RequestContext } from '../../interfaces/RequestContext.js';

import type { COMMANDS } from '../../commands/constants/commandRegistry.js';

const liveRequests = new Map<string, RequestContext[]>();

export function addLiveRequest(userId: string, requestContext: RequestContext): void {
  const existingLiveRequests = liveRequests.get(userId);
  
  if (existingLiveRequests) {
    existingLiveRequests.push(requestContext);
  } else {
    liveRequests.set(userId, [requestContext]);
  }
}

export function removeLiveRequest(
  userId: string, 
  commandName: keyof typeof COMMANDS | null
): void {
  if (!commandName) return;

  const existingLiveRequests = liveRequests.get(userId);
  if (!existingLiveRequests) return;

  const filtered = existingLiveRequests.filter(
    requestContext => requestContext.commandName !== commandName
  );

  switch(filtered.length) {
    case 0:
      liveRequests.delete(userId);
      break;

    case existingLiveRequests.length:
      return;

    default:
      liveRequests.set(userId, filtered);
      break;
  }
}

export function getLiveRequestsFromUser(userId: string): RequestContext[] {
  return liveRequests.get(userId) ?? [];
}