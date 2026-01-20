import { getSystemPersona } from "./getSystemPersona.js";
import { resolvePersona } from "./resolvePersona.js";

export function resolveSystemCommandConfig<T extends object>(
  extra: T
) {
  const persona = resolvePersona(getSystemPersona());

  return {
    ...persona,
    ...extra,
  };
}
