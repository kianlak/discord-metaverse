import type { ChannelPersona } from "../interfaces/ChannelPersona.js";

import { HEADSHOTS } from "../config/index.js";

export function resolvePersona(persona: ChannelPersona) {
  if (!persona.headshot) {
    return {
      ...persona,
      thumbnailUrl: undefined,
      thumbnailAssetPath: undefined,
    };
  }

  const headshot = HEADSHOTS[persona.headshot];

  return {
    ...persona,
    thumbnailUrl: `attachment://${headshot.attachmentName}`,
    thumbnailAssetPath: headshot.path,
  };
}