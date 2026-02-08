import { ProfileRepository } from "../repository/ProfileRepository.js";
import { BegService } from "../../beg/services/BegService.js";
import { UserService } from "../../../../core/User/services/UserService.js";

import { calculateBegEfficiency } from "../helpers/calculateBegEfficiency.js";

import type { MainProfileStats } from "../interfaces/MainProfileStats.js";

export class ProfileService {
  private readonly repo: ProfileRepository;

  constructor(
    repo?: ProfileRepository,
  ) { this.repo = repo ?? new ProfileRepository(); }

  getMainProfileStats(discordId: string): MainProfileStats {
    const userService = new UserService();
    const begService = new BegService(userService);

    const totalBegs = begService.getTotalBegs(discordId);
    const begProfit = begService.getTotalBegProfit(discordId);
    const begNumberTierFour: number | null = begService.getTierFourAchievedBegNumber(discordId);

    const efficiencyStats = calculateBegEfficiency(totalBegs, begProfit, begNumberTierFour);

    return this.repo.getUserMainStatsByDiscordId(discordId, efficiencyStats.percentile);
  }
}