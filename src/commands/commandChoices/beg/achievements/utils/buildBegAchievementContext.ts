import { UserService } from "../../../../../core/User/services/UserService.js";
import { BegService } from "../../services/BegService.js";

import type { AchievementContext } from "../../../../../core/Achievements/interfaces/AchievementContext.js";

export function buildBegAchievementContext(
  discordId: string
): AchievementContext {
  const begService = new BegService(new UserService());

  return {
    discordId,

    beg: {
      totalBegs: begService.getTotalBegs(discordId),
      totalBegProfit: begService.getTotalBegProfit(discordId),
    }
  };
}