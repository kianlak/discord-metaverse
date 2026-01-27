import { COMMANDS } from "../../../constants/commandRegistry.js";

export function getCommandsByCategory(category: string) {
  return Object.entries(COMMANDS).filter(
    ([_, config]) =>
      config.category.toLowerCase() === category.toLowerCase()
  );
}
