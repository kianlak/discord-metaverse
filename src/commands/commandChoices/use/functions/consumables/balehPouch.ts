import { UserService } from "../../../../../core/User/services/UserService.js";
import { UseService } from "../../services/useService.js";

import type { BalehPouchResult } from "./interfaces/balehPouchResult.js";

export async function balehPouch(discordId: string): Promise<BalehPouchResult> {
  const useService = new UseService();
  const userService = new UserService();
  const reward = Math.ceil(Math.random() * 50) + 1;

  useService.addBalehBucks(discordId, reward);
  const newBalance = userService.getBalehBucks(discordId);

  return { reward, newBalance};
}
