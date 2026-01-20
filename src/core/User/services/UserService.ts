import { UserRepository } from "../repository/UserRepository.js";

import { logger } from "../../../bot/logger/logger.js";

import type { RequestContext } from "../../../interfaces/RequestContext.js";

export class UserService {
  private readonly repo: UserRepository;

  constructor(repo?: UserRepository) {
    this.repo = repo ?? new UserRepository();
  }
  
  ensureUserIsCreated(requestContext: RequestContext): boolean {
    logger.info(
      requestContext,
      `Ensuring user is created`
    );

    return this.repo.ensureUserIsCreated(requestContext.user.id);
  }

  getLastBegAt(discordId: string): number {
    return this.repo.getLastBegAtByDiscordId(discordId);
  }

  getBalehBucks(discordId: string): number {
    return this.repo.getBalehBucksByDiscordId(discordId);
  }
}