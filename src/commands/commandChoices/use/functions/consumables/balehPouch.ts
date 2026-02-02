import { UseService } from "../../services/useService.js";

import type { BalehPouchResult } from "./interfaces/balehPouchResult.js";

export async function balehPouch(discordId: string): Promise<BalehPouchResult> {
  const useService = new UseService();
  const reward = Math.ceil(Math.random() * 50) + 1;

  useService.addBalehBucks(discordId, reward);

  return { reward };
}
