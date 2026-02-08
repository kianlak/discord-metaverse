import { resolvePersona } from "./resolvePersona.js";

export function getBolbiPersona() {
  return resolvePersona({
    title: "Bolbi",
    footer: "Bolbi's Shop",
    headshot: "BOLBI",
  });
}