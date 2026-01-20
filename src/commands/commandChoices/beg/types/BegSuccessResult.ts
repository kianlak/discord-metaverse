import type { BegResult } from "./BegResult.js";

export type BegSuccessResult = Extract<BegResult, { type: "SUCCESS" }>;