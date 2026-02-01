import type { ItemDefinition } from "../interfaces/ItemDefinition.js";

export const ITEMS: ItemDefinition[] = [
  {
    item_id: "ktcm1",
    item_name: "Thanos Casino Membership",
    description: "Use to unlock Thanos Casino",
    value: 1500,
    item_type: "KEY",
    rarity: "COMMON",
    sellable: false,
    tradable: false,

    use: async () => {
      
    },
  },

  {
    item_id: "test1",
    item_name: "Thanos Casino Membership",
    description: "Use to unlock Thanos Casino",
    value: 1500,
    item_type: "MATERIAL",
    rarity: "COMMON",
    sellable: false,
    tradable: false,

    use: async () => {
      
    },
  },

  {
    item_id: "cbp1",
    item_name: "Baleh Pouch",
    description: "Use to gain 1-50 coins from the pouch",
    value: 10,
    item_type: "CONSUMABLE",
    rarity: "COMMON",
    sellable: false,
    tradable: false,

    use: async () => {
      
    },
  },
];
