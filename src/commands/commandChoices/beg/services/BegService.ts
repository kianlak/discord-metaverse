import { UserService } from "../../../../core/User/services/UserService.js";
import { BegRepository } from "../repository/BegRepository.js";

import { checkBegCooldown } from "../helpers/checkBegCooldown.js";
import { getBegReward } from "../utils/getBegReward.js";

import type { BegResult } from "../types/BegResult.js";

export class BegService {
  private readonly repo: BegRepository;

  constructor(
    private userService: UserService, 
    repo?: BegRepository 
  ) {
    this.repo = repo ?? new BegRepository();
  }

  beg(discordId: string): BegResult {
    const now = Date.now();
    const lastBegAt = this.userService.getLastBegAt(discordId);
    
    const timeRemainingInMs = checkBegCooldown(lastBegAt, now);
    
    if (timeRemainingInMs) return { type: 'COOLDOWN', timeRemainingInMs } as BegResult;

    const reward = getBegReward();

    this.repo.applyBeg({
      discordId,
      reward,
      timestamp: now,
    });

    const newBalance = this.userService.getBalehBucks(discordId);

    return {
      type: 'SUCCESS',
      reward,
      newBalance,
    } as BegResult;
  }
}