import { ProfileRepository } from "../repository/ProfileRepository.js";

import type { MainProfileStats } from "../interfaces/MainProfileStats.js";

export class ProfileService {
  private readonly repo: ProfileRepository;

  constructor(
    repo?: ProfileRepository,
  ) { this.repo = repo ?? new ProfileRepository(); }

  getMainProfileStats(discordId: string): MainProfileStats {    
    return this.repo.getUserMainStatsByDiscordId(discordId);
  }
}