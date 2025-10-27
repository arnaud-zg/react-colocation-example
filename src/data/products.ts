import { Money } from "@/domain/cart/value-objects/Money";
import {
  ImageUrl,
  KnowledgeContent,
  Product,
  ProductId,
  ProductName,
} from "@/domain/cart/value-objects/Product/Product";
import {
  Effect,
  ExtraResources,
  ProfileDetails,
  Stats,
} from "@/domain/cart/value-objects/Product/ProductDetails";

export const PRODUCTS: Product[] = [
  new Product(
    new ProductId("thunderfury"),
    new ProductName("Thunderfury, Blessed Blade of the Windseeker"),
    new Money(485),
    new ImageUrl(
      "https://static.wikia.nocookie.net/wowpedia/images/c/c9/Thunderfury%2C_Blessed_Blade_of_the_Windseeker.JPG"
    ),
    new KnowledgeContent(
      new ProfileDetails(
        "A legendary sword that channels the power of storms. Wield it to summon lightning upon your foes.",
        new Stats(150, 50, 0),
        [new Effect("Chance to strike enemies with lightning.")],
        new ExtraResources(
          "https://wowpedia.fandom.com/wiki/Thunderfury,_Blessed_Blade_of_the_Windseeker",
          "https://www.youtube.com/embed/2TGRpvb5Nos"
        )
      ),
      new ProfileDetails(
        "Thunderfury is forged with elemental fury. Great for battle, with bonus lightning damage and attack speed.",
        new Stats(300, 100, 10),
        [
          new Effect("Increases attack speed by 15%"),
          new Effect("Lightning damage with each hit"),
          new Effect("Chance to slow enemies"),
        ],
        new ExtraResources(
          "https://wowpedia.fandom.com/wiki/Thunderfury,_Blessed_Blade_of_the_Windseeker",
          "https://www.youtube.com/embed/2TGRpvb5Nos"
        )
      ),
      new ProfileDetails(
        "Thunderfury, Blessed Blade of the Windseeker, is a legendary weapon of immense power. It channels elemental air, unleashing lightning with each strike. Its artifact status is confirmed by its rarity and crafting requirements.",
        new Stats(500, 150, 25),
        [
          new Effect("Attack speed +25%"),
          new Effect("Unleashes chain lightning on critical strikes"),
          new Effect("Chance to silence enemies"),
          new Effect("Grants immunity to silence for 5 seconds"),
        ],
        new ExtraResources(
          "https://wowpedia.fandom.com/wiki/Thunderfury,_Blessed_Blade_of_the_Windseeker",
          "https://www.youtube.com/embed/2TGRpvb5Nos"
        )
      )
    )
  ),
  new Product(
    new ProductId("ashbringer"),
    new ProductName("Ashbringer"),
    new Money(750),
    new ImageUrl(
      "https://static.wikia.nocookie.net/wowpedia/images/a/a6/Ashbringer_TCG.jpg"
    ),
    new KnowledgeContent(
      new ProfileDetails(
        "A holy sword blessed to purge the undead. Known for its radiant power.",
        new Stats(200, 70, 0),
        [new Effect("Bonus against undead enemies.")],
        new ExtraResources(
          "https://wowpedia.fandom.com/wiki/Ashbringer",
          "https://www.youtube.com/embed/lso8Ygk4rKc"
        )
      ),
      new ProfileDetails(
        "Ashbringer channels holy energy to smite foes, cleansing corruption and undead.",
        new Stats(350, 140, 20),
        [new Effect("Holy damage +25%"), new Effect("Undead vulnerability.")],
        new ExtraResources(
          "https://wowpedia.fandom.com/wiki/Ashbringer",
          "https://www.youtube.com/embed/lso8Ygk4rKc"
        )
      ),
      new ProfileDetails(
        "Ashbringer is the embodiment of righteousness. It delivers devastating holy strikes and vanquishes evil.",
        new Stats(600, 220, 40),
        [
          new Effect("Holy damage +50%"),
          new Effect("Instant kill chance on undead"),
          new Effect("Grant blessing to allies"),
        ],
        new ExtraResources(
          "https://wowpedia.fandom.com/wiki/Ashbringer",
          "https://www.youtube.com/embed/lso8Ygk4rKc"
        )
      )
    )
  ),
  new Product(
    new ProductId("sulfuras"),
    new ProductName("Sulfuras, Hand of Ragnaros"),
    new Money(900),
    new ImageUrl(
      "https://static.wikia.nocookie.net/wowpedia/images/6/6e/Sulfuras_Hand_of_Ragnaros_TCG.jpg"
    ),
    new KnowledgeContent(
      new ProfileDetails(
        "A molten hammer forged in elemental fire, granting immense strength.",
        new Stats(220, 80, 0),
        [new Effect("Fire damage over time.")],
        new ExtraResources(
          "https://wowpedia.fandom.com/wiki/Sulfuras,_Hand_of_Ragnaros",
          "https://www.youtube.com/embed/crNEJBci-Es"
        )
      ),
      new ProfileDetails(
        "Sulfuras channels molten fire into devastating blows that incinerate enemies.",
        new Stats(400, 160, 0),
        [new Effect("Fire blast chance"), new Effect("Burn enemies for 10s")],
        new ExtraResources(
          "https://wowpedia.fandom.com/wiki/Sulfuras,_Hand_of_Ragnaros",
          "https://www.youtube.com/embed/crNEJBci-Es"
        )
      ),
      new ProfileDetails(
        "Sulfuras is a weapon of pure elemental fury, capable of burning armies with a single strike.",
        new Stats(700, 300, 0),
        [
          new Effect("Fire damage +70%"),
          new Effect("Area of effect burn"),
          new Effect("Ignite enemies on critical strike"),
        ],
        new ExtraResources(
          "https://wowpedia.fandom.com/wiki/Sulfuras,_Hand_of_Ragnaros",
          "https://www.youtube.com/embed/crNEJBci-Es"
        )
      )
    )
  ),
  new Product(
    new ProductId("valanyr"),
    new ProductName("Val'anyr, Hammer of Ancient Kings"),
    new Money(650),
    new ImageUrl(
      "https://static.wikia.nocookie.net/wowpedia/images/7/76/Val%27anyr%2C_Hammer_of_Ancient_Kings_TCG.jpg"
    ),
    new KnowledgeContent(
      new ProfileDetails(
        "A holy hammer that heals allies with each strike.",
        new Stats(160, 60, 20),
        [new Effect("Heals allies on hit.")],
        new ExtraResources(
          "https://wowpedia.fandom.com/wiki/Val'anyr,_Hammer_of_Ancient_Kings",
          "https://www.youtube.com/embed/u5GX0RHW6KM"
        )
      ),
      new ProfileDetails(
        "Val'anyr channels holy energy to protect allies in battle.",
        new Stats(320, 140, 40),
        [new Effect("Heal over time for allies."), new Effect("Shield chance")],
        new ExtraResources(
          "https://wowpedia.fandom.com/wiki/Val'anyr,_Hammer_of_Ancient_Kings",
          "https://www.youtube.com/embed/u5GX0RHW6KM"
        )
      ),
      new ProfileDetails(
        "Val'anyr is a divine relic that grants immense healing and protection to allies.",
        new Stats(580, 220, 60),
        [
          new Effect("Massive healing over time"),
          new Effect("Full shield on critical hits"),
          new Effect("Grant immunity to all debuffs for 5 seconds"),
        ],
        new ExtraResources(
          "https://wowpedia.fandom.com/wiki/Val'anyr,_Hammer_of_Ancient_Kings",
          "https://www.youtube.com/embed/u5GX0RHW6KM"
        )
      )
    )
  ),
  new Product(
    new ProductId("doomhammer"),
    new ProductName("Doomhammer"),
    new Money(680),
    new ImageUrl(
      "https://static.wikia.nocookie.net/wowpedia/images/a/a2/Doomhammer_TCG.jpg"
    ),
    new KnowledgeContent(
      new ProfileDetails(
        "A mighty hammer that channels elemental earth power.",
        new Stats(170, 80, 10),
        [new Effect("Shockwave on impact.")],
        new ExtraResources(
          "https://wowpedia.fandom.com/wiki/Doomhammer",
          "https://www.youtube.com/embed/htTWpEk_XDk"
        )
      ),
      new ProfileDetails(
        "Doomhammer enhances the wielder’s strength and earth-based magic.",
        new Stats(340, 160, 20),
        [
          new Effect("Shockwave radius +15%"),
          new Effect("Stun chance on heavy attacks"),
        ],
        new ExtraResources(
          "https://wowpedia.fandom.com/wiki/Doomhammer",
          "https://www.youtube.com/embed/htTWpEk_XDk"
        )
      ),
      new ProfileDetails(
        "Doomhammer is the ultimate weapon of war, capable of shaking the very earth.",
        new Stats(610, 300, 40),
        [
          new Effect("Shockwave radius +50%"),
          new Effect("Stun all enemies within range"),
          new Effect("Damage immunity for 3 seconds after a heavy attack"),
        ],
        new ExtraResources(
          "https://wowpedia.fandom.com/wiki/Doomhammer",
          "https://www.youtube.com/embed/htTWpEk_XDk"
        )
      )
    )
  ),
];
