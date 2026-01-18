import { getTimestamp } from '../utils/getTimestamp.js';

import type { RequestContext } from '../../interfaces/RequestContext.js';
import type { LogType } from './types/LogType.js';

import { ANSI_RESET, LOG_STYLES } from './constants/LOG_STYLES.js';
import { LOG_SPACING } from './constants/LOG_SPACING.js';

class Logger {
  private log(
    type: LogType,
    message: string,
    options?: {
      username?: string;
      requestId?: string;
      metadata?: unknown;
      error?: Error;
    }
  ): void {
    const { color, emoji } = LOG_STYLES[type];
    const timestamp = getTimestamp();
    const spacing = LOG_SPACING[type];

    const userText = options?.username ? ` [${options.username}]` : '';
    const requestText = options?.requestId ? ` [ID=${options.requestId}]` : '';

    const hasDetails =
      options?.metadata !== undefined || options?.error !== undefined;

    const header =
      `${color}${emoji} [${type}]` +
      `${spacing}[${timestamp}]` +
      `${userText}${requestText}`;

    if (!hasDetails) {
      console.log(`${header} ${message}${ANSI_RESET}`);
      return;
    }

    let output = header;

    output += `\n  └─ ${message}${ANSI_RESET}`;

    if (options?.error) {
      const errorText =
        options.error.stack ?? options.error.message;

      output += `\n     ${errorText
        .split('\n')
        .join('\n     ')}`;
    }

    if (options?.metadata !== undefined) {
      const metadataText = JSON.stringify(options.metadata, null, 2);

      output += `\n     ${metadataText
        .split('\n')
        .join('\n     ')}`;
    }

    console.log(output);
  }

  success(message: string, metadata?: unknown): void;
  success(requestContext: RequestContext, message: string, metadata?: unknown): void;
  success(
    requestContextOrMessage: RequestContext | string,
    messageOrMetadata?: string | unknown,
    metadata?: unknown
  ): void {
    if (typeof requestContextOrMessage === 'string') {
      this.log('SUCCESS', requestContextOrMessage, { metadata: messageOrMetadata });
      return;
    }

    this.log('SUCCESS', messageOrMetadata as string, {
      requestId: requestContextOrMessage.requestId,
      username: requestContextOrMessage.user.name,
      metadata,
    });
  }

  info(message: string, metadata?: unknown): void;
  info(requestContext: RequestContext, message: string, metadata?: unknown): void;
  info(
    requestContextOrMessage: RequestContext | string,
    messageOrMetadata?: string | unknown,
    metadata?: unknown
  ): void {
    if (typeof requestContextOrMessage === 'string') {
      this.log('INFO', requestContextOrMessage, { metadata: messageOrMetadata });
      return;
    }

    this.log('INFO', messageOrMetadata as string, {
      requestId: requestContextOrMessage.requestId,
      username: requestContextOrMessage.user.name,
      metadata,
    });
  }

  warn(message: string, metadata?: unknown): void;
  warn(requestContext: RequestContext, message: string, metadata?: unknown): void;
  warn(
    requestContextOrMessage: RequestContext | string,
    messageOrMetadata?: string | unknown,
    metadata?: unknown
  ): void {
    if (typeof requestContextOrMessage === 'string') {
      this.log('WARN', requestContextOrMessage, { metadata: messageOrMetadata });
      return;
    }

    this.log('WARN', messageOrMetadata as string, {
      requestId: requestContextOrMessage.requestId,
      username: requestContextOrMessage.user.name,
      metadata,
    });
  }

  error(message: string, error?: Error, metadata?: unknown): void;
  error(
    requestContext: RequestContext,
    message: string,
    error?: Error,
    metadata?: unknown
  ): void;
  error(
    requestContextOrMessage: RequestContext | string,
    messageOrError?: string | Error,
    maybeErrorOrMetadata?: Error | unknown,
    metadata?: unknown
  ): void {
    if (typeof requestContextOrMessage === 'string') {
      this.log('ERROR', requestContextOrMessage, {
        ...(messageOrError instanceof Error && { error: messageOrError }),
        ...(maybeErrorOrMetadata !== undefined && {
          metadata: maybeErrorOrMetadata,
        }),
      });
      return;
    }

    this.log('ERROR', messageOrError as string, {
      requestId: requestContextOrMessage.requestId,
      username: requestContextOrMessage.user.name,
      ...(maybeErrorOrMetadata instanceof Error && {
        error: maybeErrorOrMetadata,
      }),
      ...(metadata !== undefined && { metadata }),
    });
  }
}

export const logger = new Logger();
