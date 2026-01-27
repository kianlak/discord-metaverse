import { UserRepository } from "../repository/UserRepository.js";

import { logger } from "../../../bot/logger/logger.js";

import type { UserContext } from "../../../interfaces/UserContext.js";

export class UserService {
  private readonly repo: UserRepository;

  constructor(repo?: UserRepository) {
    this.repo = repo ?? new UserRepository();
  }
  
  ensureUserIsCreated(user: UserContext): boolean {
    logger.info(
      `Ensuring user ${user.name} is created`
    );

    return this.repo.ensureUserIsCreated(user.id);
  }

  getLastBegAt(discordId: string): number {
    return this.repo.getLastBegAtByDiscordId(discordId);
  }

  getBalehBucks(discordId: string): number {
    return this.repo.getBalehBucksByDiscordId(discordId);
  }
}