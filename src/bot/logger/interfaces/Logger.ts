import type { RequestContext } from "../../../interfaces/RequestContext.js";
import type { ContextualLogger } from "./ContextualLogger.js";

export interface Logger {
  info(message: string, meta?: unknown): void;
  warn(message: string, meta?: unknown): void;
  error(message: string, meta?: unknown): void;

  withContext(ctx: RequestContext): ContextualLogger;
}