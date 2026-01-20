import { getSystemPersona } from "../../utils/getSystemPersona.js";
import { resolvePersona } from "../../utils/resolvePersona.js";

import type { ChannelPersona } from "../../interfaces/ChannelPersona.js";

import { CHANNEL_PERSONAS } from "../../config/channelPersonas.js";

export function resolveCommandConfigFromChannel<
  TRule,
  TConfig extends object
>(
  channelId: string,
  rule: TRule | undefined,
  mapRuleToConfig: (rule: TRule) => TConfig
): (TConfig & ReturnType<typeof resolvePersona>) | null {
  if (!rule) return null;

  const basePersona: ChannelPersona = CHANNEL_PERSONAS[channelId] ?? getSystemPersona();

  const persona = resolvePersona(basePersona);

  return {
    ...persona,
    ...mapRuleToConfig(rule),
  };
}