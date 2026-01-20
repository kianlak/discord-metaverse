import type { ChannelPersona } from "../interfaces/ChannelPersona.js";

import { CHANNELS } from "./index.js";

export const CHANNEL_PERSONAS: Partial<
  Record<string, ChannelPersona>
> = {
  [CHANNELS.DEV_TEST]: {
    title: "Metaverse Manager",
    footer: "Kian Canes Metaverse Manager",
    headshot: "METAVERSE_MANAGER",
  },

  [CHANNELS.BOLBI_SHOP]: {
    title: "Bolbi",
    footer: "Bolbi's Shop",
    headshot: "BOLBI",
  },
};