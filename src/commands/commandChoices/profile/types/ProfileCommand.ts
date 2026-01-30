export type ProfileCommand = 
  | { 
      name: 'profile'; 
      form: 'NO_ARGUMENTS'; 
    }
  | { 
      name: 'profile'; 
      form: 'TARGET_USER';
      targetUserId: string;
    };