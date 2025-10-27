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
import { describe, expect, it } from "vitest";
import { Cart } from "../Cart";

const PRODUCT_1 = new Product(
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
);

const PRODUCT_2 = new Product(
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
);

describe("Cart", () => {
  it("should be empty when initialized without items", () => {
    const cart = new Cart();
    expect(cart.isEmpty()).toBe(true);
  });

  it("should add items to the cart", () => {
    const cart = new Cart();
    const cartAfterAdd = cart.addItem(PRODUCT_1);

    expect(cartAfterAdd.isEmpty()).toBe(false);
    expect(cartAfterAdd.getItemsCopy().length).toBe(1);
    expect(cartAfterAdd.getItemsCopy()[0].getId()).toBe("thunderfury");
    expect(cartAfterAdd.getItemsCopy()[0].getQuantity().toValue()).toBe(1);
  });

  it("should increment quantity if product already exists", () => {
    let cart = new Cart();
    cart = cart.addItem(PRODUCT_1);
    cart = cart.addItem(PRODUCT_1);

    const item = cart.getItemsCopy()[0];
    expect(item.getQuantity().toValue()).toBe(2);
  });

  it("should decrement item quantity", () => {
    let cart = new Cart();
    cart = cart.addItem(PRODUCT_1);
    cart = cart.addItem(PRODUCT_1);

    const cartAfterDecrement = cart.decrementItem(PRODUCT_1);
    const item = cartAfterDecrement.getItemsCopy()[0];
    expect(item.getQuantity().toValue()).toBe(1);
  });

  it("should not decrement below MIN_QUANTITY", () => {
    const cart = new Cart().addItem(PRODUCT_1);
    const cartAfterDecrement = cart.decrementItem(PRODUCT_1);
    const item = cartAfterDecrement.getItemsCopy()[0];
    expect(item.getQuantity().toValue()).toBe(1);
  });

  it("should delete item from cart", () => {
    let cart = new Cart();
    cart = cart.addItem(PRODUCT_1);
    cart = cart.addItem(PRODUCT_2);

    const cartAfterDelete = cart.deleteItem(PRODUCT_1);
    expect(cartAfterDelete.getItemsCopy().length).toBe(1);
    expect(cartAfterDelete.getItemsCopy()[0].getId()).toBe("ashbringer");
  });

  it("should calculate subtotal correctly", () => {
    let cart = new Cart();
    cart = cart.addItem(PRODUCT_1);
    cart = cart.addItem(PRODUCT_2);
    cart = cart.addItem(PRODUCT_1);

    const subtotal = cart.calculateSubtotal();
    expect(subtotal.toAmount()).toBe(485 * 2 + 750); // 1720
  });

  it("should calculate total items correctly", () => {
    let cart = new Cart();
    cart = cart.addItem(PRODUCT_1);
    cart = cart.addItem(PRODUCT_1);
    cart = cart.addItem(PRODUCT_2);

    const totalItems = cart.totalItems();
    expect(totalItems.toValue()).toBe(3);
  });

  it("should calculate total with shipping and tax", () => {
    let cart = new Cart();
    cart = cart.addItem(PRODUCT_1);
    cart = cart.addItem(PRODUCT_2);

    const subtotal = cart.calculateSubtotal().toAmount();
    const shipping = cart.calculateShipping().toAmount();
    const tax = cart.calculateTax().toAmount();
    const total = cart.calculateTotal().toAmount();

    // Check basic consistency
    expect(subtotal).toBe(1235);
    expect(shipping).toBe(0);
    expect(tax).toBeCloseTo(86.45);
    expect(total).toBeCloseTo(1321.45);
  });
});
