export type InventoryCommand = 
  | { 
      name: 'inventory'; 
      form: 'NO_ARGUMENTS'; 
    }
  | { 
      name: 'inventory'; 
      form: 'TARGET_USER';
      targetUserId: string;
    }
  | { 
    name: 'inventory'; 
    form: 'ITEM_INFO';
    itemId: string;
  };