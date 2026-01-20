import type { BegResult } from "./BegResult.js";

export type BegCooldownResult = Extract<BegResult, { type: "COOLDOWN" }>;
