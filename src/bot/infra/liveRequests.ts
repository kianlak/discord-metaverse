import type { RequestContext } from "../../interfaces/RequestContext.js";

const liveRequests = new Map<string, RequestContext>();

export function addToLiveRequests(userId: string, requestContext: RequestContext): void {
  liveRequests.set(userId, requestContext);
}

export function markLiveRequestsFinished(userId: string): void {
  liveRequests.delete(userId);
}

export function getLiveRequests(userId: string): RequestContext | undefined {
  return liveRequests.get(userId);
}

export function getAllInFlightRequests(): RequestContext[] {
  return Array.from(liveRequests.values());
}