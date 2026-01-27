import { COMMANDS } from "../../../constants/commandRegistry.js";

export function getCategories(): string[] {
  return Array.from(
    new Set(
      Object.values(COMMANDS).map(c => c.category)
    )
  );
}
