import { Money } from "@/domain/cart/value-objects/Money";
import type { Product } from "@/domain/cart/value-objects/Product";

export const PRODUCTS: Product[] = [
  {
    id: "thunderfury",
    name: "Thunderfury, Blessed Blade of the Windseeker",
    price: new Money(485),
    imageUrl:
      "https://static.wikia.nocookie.net/wowpedia/images/c/c9/Thunderfury%2C_Blessed_Blade_of_the_Windseeker.JPG",
    knowledge: {
      beginning: {
        description:
          "A legendary sword that channels the power of storms. Wield it to summon lightning upon your foes.",
        stats: { power: 150, durability: 50, manaBoost: 0 },
        effects: ["Chance to strike enemies with lightning."],
        extraResources: {
          loreLink:
            "https://wowpedia.fandom.com/wiki/Thunderfury,_Blessed_Blade_of_the_Windseeker",
          videoUrl: "https://www.youtube.com/embed/2TGRpvb5Nos",
        },
      },
      adventurer: {
        description:
          "Thunderfury is forged with elemental fury. Great for battle, with bonus lightning damage and attack speed.",
        stats: { power: 300, durability: 100, manaBoost: 10 },
        effects: [
          "Increases attack speed by 15%",
          "Lightning damage with each hit",
          "Chance to slow enemies",
        ],
        extraResources: {
          loreLink:
            "https://wowpedia.fandom.com/wiki/Thunderfury,_Blessed_Blade_of_the_Windseeker",
          videoUrl: "https://www.youtube.com/embed/2TGRpvb5Nos",
        },
      },
      expert: {
        description:
          "Thunderfury, Blessed Blade of the Windseeker, is a legendary weapon of immense power. It channels elemental air, unleashing lightning with each strike. Its artifact status is confirmed by its rarity and crafting requirements.",
        stats: { power: 500, durability: 150, manaBoost: 25 },
        effects: [
          "Attack speed +25%",
          "Unleashes chain lightning on critical strikes",
          "Chance to silence enemies",
          "Grants immunity to silence for 5 seconds",
        ],
        extraResources: {
          loreLink:
            "https://wowpedia.fandom.com/wiki/Thunderfury,_Blessed_Blade_of_the_Windseeker",
          videoUrl: "https://www.youtube.com/embed/2TGRpvb5Nos",
        },
      },
    },
  },
  {
    id: "ashbringer",
    name: "Ashbringer",
    price: new Money(750),
    imageUrl:
      "https://static.wikia.nocookie.net/wowpedia/images/a/a6/Ashbringer_TCG.jpg",
    knowledge: {
      beginning: {
        description:
          "A holy sword blessed to purge the undead. Known for its radiant power.",
        stats: { power: 200, durability: 70, manaBoost: 0 },
        effects: ["Bonus against undead enemies."],
        extraResources: {
          loreLink: "https://wowpedia.fandom.com/wiki/Ashbringer",
          videoUrl: "https://www.youtube.com/embed/lso8Ygk4rKc",
        },
      },
      adventurer: {
        description:
          "Ashbringer channels holy energy to smite foes, cleansing corruption and undead.",
        stats: { power: 350, durability: 140, manaBoost: 20 },
        effects: ["Holy damage +25%", "Undead vulnerability."],
        extraResources: {
          loreLink: "https://wowpedia.fandom.com/wiki/Ashbringer",
          videoUrl: "https://www.youtube.com/embed/lso8Ygk4rKc",
        },
      },
      expert: {
        description:
          "Ashbringer is the embodiment of righteousness. It delivers devastating holy strikes and vanquishes evil.",
        stats: { power: 600, durability: 220, manaBoost: 40 },
        effects: [
          "Holy damage +50%",
          "Instant kill chance on undead",
          "Grant blessing to allies",
        ],
        extraResources: {
          loreLink: "https://wowpedia.fandom.com/wiki/Ashbringer",
          videoUrl: "https://www.youtube.com/embed/lso8Ygk4rKc",
        },
      },
    },
  },
  {
    id: "sulfuras",
    name: "Sulfuras, Hand of Ragnaros",
    price: new Money(900),
    imageUrl:
      "https://static.wikia.nocookie.net/wowpedia/images/6/6e/Sulfuras_Hand_of_Ragnaros_TCG.jpg",
    knowledge: {
      beginning: {
        description:
          "A molten hammer forged in elemental fire, granting immense strength.",
        stats: { power: 220, durability: 80, manaBoost: 0 },
        effects: ["Fire damage over time."],
        extraResources: {
          loreLink:
            "https://wowpedia.fandom.com/wiki/Sulfuras,_Hand_of_Ragnaros",
          videoUrl: "https://www.youtube.com/embed/crNEJBci-Es",
        },
      },
      adventurer: {
        description:
          "Sulfuras channels molten fire into devastating blows that incinerate enemies.",
        stats: { power: 400, durability: 160, manaBoost: 0 },
        effects: ["Fire blast chance", "Burn enemies for 10s"],
        extraResources: {
          loreLink:
            "https://wowpedia.fandom.com/wiki/Sulfuras,_Hand_of_Ragnaros",
          videoUrl: "https://www.youtube.com/embed/crNEJBci-Es",
        },
      },
      expert: {
        description:
          "Sulfuras is a weapon of pure elemental fury, capable of burning armies with a single strike.",
        stats: { power: 700, durability: 300, manaBoost: 0 },
        effects: [
          "Fire damage +70%",
          "Area of effect burn",
          "Ignite enemies on critical strike",
        ],
        extraResources: {
          loreLink:
            "https://wowpedia.fandom.com/wiki/Sulfuras,_Hand_of_Ragnaros",
          videoUrl: "https://www.youtube.com/embed/crNEJBci-Es",
        },
      },
    },
  },
  {
    id: "valanyr",
    name: "Val'anyr, Hammer of Ancient Kings",
    price: new Money(650),
    imageUrl:
      "https://static.wikia.nocookie.net/wowpedia/images/7/76/Val%27anyr%2C_Hammer_of_Ancient_Kings_TCG.jpg",
    knowledge: {
      beginning: {
        description: "A holy hammer that heals allies with each strike.",
        stats: { power: 160, durability: 60, manaBoost: 20 },
        effects: ["Heals allies on hit."],
        extraResources: {
          loreLink:
            "https://wowpedia.fandom.com/wiki/Val'anyr,_Hammer_of_Ancient_Kings",
          videoUrl: "https://www.youtube.com/embed/u5GX0RHW6KM",
        },
      },
      adventurer: {
        description:
          "Val'anyr channels holy energy to protect allies in battle.",
        stats: { power: 320, durability: 140, manaBoost: 40 },
        effects: ["Heal over time for allies.", "Shield chance"],
        extraResources: {
          loreLink:
            "https://wowpedia.fandom.com/wiki/Val'anyr,_Hammer_of_Ancient_Kings",
          videoUrl: "https://www.youtube.com/embed/u5GX0RHW6KM",
        },
      },
      expert: {
        description:
          "Val'anyr is a divine relic that grants immense healing and protection to allies.",
        stats: { power: 580, durability: 220, manaBoost: 60 },
        effects: [
          "Massive healing over time",
          "Full shield on critical hits",
          "Grant immunity to all debuffs for 5 seconds",
        ],
        extraResources: {
          loreLink:
            "https://wowpedia.fandom.com/wiki/Val'anyr,_Hammer_of_Ancient_Kings",
          videoUrl: "https://www.youtube.com/embed/u5GX0RHW6KM",
        },
      },
    },
  },
  {
    id: "doomhammer",
    name: "Doomhammer",
    price: new Money(680),
    imageUrl:
      "https://static.wikia.nocookie.net/wowpedia/images/a/a2/Doomhammer_TCG.jpg",
    knowledge: {
      beginning: {
        description: "A mighty hammer that channels elemental earth power.",
        stats: { power: 170, durability: 80, manaBoost: 10 },
        effects: ["Shockwave on impact."],
        extraResources: {
          loreLink: "https://wowpedia.fandom.com/wiki/Doomhammer",
          videoUrl: "https://www.youtube.com/embed/htTWpEk_XDk",
        },
      },
      adventurer: {
        description:
          "Doomhammer enhances the wielder’s strength and earth-based magic.",
        stats: { power: 340, durability: 160, manaBoost: 20 },
        effects: ["Shockwave radius +15%", "Stun chance on heavy attacks"],
        extraResources: {
          loreLink: "https://wowpedia.fandom.com/wiki/Doomhammer",
          videoUrl: "https://www.youtube.com/embed/htTWpEk_XDk",
        },
      },
      expert: {
        description:
          "Doomhammer is the ultimate weapon of war, capable of shaking the very earth.",
        stats: { power: 610, durability: 300, manaBoost: 40 },
        effects: [
          "Shockwave radius +50%",
          "Stun all enemies within range",
          "Damage immunity for 3 seconds after a heavy attack",
        ],
        extraResources: {
          loreLink: "https://wowpedia.fandom.com/wiki/Doomhammer",
          videoUrl: "https://www.youtube.com/embed/htTWpEk_XDk",
        },
      },
    },
  },
];
