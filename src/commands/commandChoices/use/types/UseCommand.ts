export type UseCommand = 
  | { 
      name: 'use'; 
      form: 'ITEM_USE';
      item_id: string;
    };