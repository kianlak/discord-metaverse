import type { UnknownCommandConfig } from "../interfaces/UnknwonCommandConfig.js";

export function selectRandomPrompt(config: UnknownCommandConfig) {
  return config.prompts[Math.floor(Math.random() * config.prompts.length)];
}