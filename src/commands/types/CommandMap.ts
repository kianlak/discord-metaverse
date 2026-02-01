import type { CommandDefinition } from "../interfaces/CommandDefinition.js";
import type { HelpCommand } from "../commandChoices/help/types/HelpCommand.js";
import type { BegCommand } from "../commandChoices/beg/types/BegCommand.js";
import type { ProfileCommand } from "../commandChoices/profile/types/ProfileCommand.js";
import type { LeaderboardCommand } from "../commandChoices/leaderboard/types/LeaderboardCommand.js";
import type { InventoryCommand } from "../commandChoices/inventory/types/CommandDefinitionInventory.js";

export type CommandMap = {
  help: CommandDefinition<HelpCommand>;
  beg: CommandDefinition<BegCommand>;
  profile: CommandDefinition<ProfileCommand>;
  leaderboard: CommandDefinition<LeaderboardCommand>;
  inventory: CommandDefinition<InventoryCommand>
};