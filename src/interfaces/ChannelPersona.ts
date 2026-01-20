import type { HeadshotKey } from "../config/index.js";

export interface ChannelPersona {
  title: string;
  footer: string;
  headshot?: HeadshotKey;
}