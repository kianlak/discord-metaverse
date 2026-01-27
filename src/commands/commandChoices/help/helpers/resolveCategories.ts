import type { HelpCategory } from "../interfaces/HelpCategory.js";

import { CATEGORY_META } from "../constants/CATEGORY_META.js";
import { COMMANDS } from "../../../constants/commandRegistry.js";

export function resolveCategories(): HelpCategory[] {
  const categories = new Set(
    Object.values(COMMANDS).map(categories => categories.category)
  );

  return Array.from(categories).map(category => ({
    name: category,
    emoji: CATEGORY_META[category]?.emoji ?? "📂",
  }));
}