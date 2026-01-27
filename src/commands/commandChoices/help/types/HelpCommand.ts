export type HelpCommand = 
  | { 
      name: 'help'; 
      form: 'NO_ARGUMENTS'; 
    }
  | { 
      name: 'help';
      form: 'COMMAND_INFO';
      commandName: string;
    };