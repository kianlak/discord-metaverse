import { resolvePersona } from "./resolvePersona.js";

export function getSystemPersona() {
  return resolvePersona({
    title: "Metaverse Manager",
    footer: "Kian Canes Metaverse Manager",
    headshot: "METAVERSE_MANAGER",
  });
}