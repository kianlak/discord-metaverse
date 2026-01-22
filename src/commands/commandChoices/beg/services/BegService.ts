import { UserService } from "../../../../core/User/services/UserService.js";
import { BegRepository } from "../repository/BegRepository.js";
import { AchievementService } from "../../../../core/Achievements/services/AchievementService.js";

import { randomInt } from "crypto";
import { checkBegCooldown } from "../helpers/checkBegCooldown.js";
import { getBegReward } from "../utils/getBegReward.js";

import type { BegResult } from "../types/BegResult.js";

export class BegService {
  private readonly repo: BegRepository;
  private readonly achievementService: AchievementService;

  constructor(
    private userService: UserService, 
    repo?: BegRepository,
    achievementService?: AchievementService
  ) {
    this.repo = repo ?? new BegRepository();
    this.achievementService = achievementService ?? new AchievementService();
  }

  beg(discordId: string): BegResult {
    const now = Date.now();
    const lastBegAt = this.userService.getLastBegAt(discordId);
    
    const timeRemainingInMs = checkBegCooldown(lastBegAt, now);
    
    if (timeRemainingInMs) return { type: 'COOLDOWN', timeRemainingInMs } as BegResult;
    
    let reward = 0;

    const effects = this.achievementService.getResolvedEffects(discordId);

    if (effects.beg?.rewardRangeBonuses.length) {
      const range = effects.beg.rewardRangeBonuses.at(-1)!;
      reward += randomInt(range.min, range.max);
    } else {
      reward = getBegReward();
      console.log(reward);
    }

    let multiplier = 1;
    let finalReward = reward;

    if (effects.beg?.rewardMultipliers.length) {
      multiplier = effects.beg.rewardMultipliers.at(-1)!;
      
      finalReward = Math.ceil(reward * multiplier);
    }

    this.repo.applyBeg({
      discordId,
      reward: finalReward,
      timestamp: now,
    });

    const newBalance = this.userService.getBalehBucks(discordId);

    return {
      type: 'SUCCESS',
      reward,
      newBalance,
      multiplier
    } as BegResult;
  }

  getTotalBegs(discordId: string): number {
    return this.repo.getTotalBegs(discordId);
  }

  getTotalBegProfit(discordId: string): number {
    return this.repo.getTotalBegProfit(discordId);
  }
}