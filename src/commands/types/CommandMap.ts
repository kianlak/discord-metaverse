import type { BegCommand } from "../commandChoices/beg/types/BegCommand.js";
import type { HelpCommand } from "../commandChoices/help/types/HelpCommand.js";
import type { LeaderboardCommand } from "../commandChoices/leaderboard/types/LeaderboardCommand.js";
import type { CommandDefinition } from "../interfaces/CommandDefinition.js";

export type CommandMap = {
  help: CommandDefinition<HelpCommand>;
  beg: CommandDefinition<BegCommand>;
  leaderboard: CommandDefinition<LeaderboardCommand>;
};