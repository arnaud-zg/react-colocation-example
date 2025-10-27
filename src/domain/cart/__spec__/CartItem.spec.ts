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
import { Quantity } from "@/domain/cart/value-objects/Quantity";
import { describe, expect, it } from "vitest";
import { CartItem } from "../CartItem";

const PRODUCT = new Product(
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

describe("CartItem", () => {
  //   const product = PRODUCT;
  const initialQuantity = new Quantity(5);
  const cartItem = new CartItem(PRODUCT, initialQuantity);

  it("should return correct id, name, image and quantity", () => {
    expect(cartItem.getId()).toBe("thunderfury");
    expect(cartItem.getName()).toBe(
      "Thunderfury, Blessed Blade of the Windseeker"
    );
    expect(cartItem.getImage()).toBe(
      "https://static.wikia.nocookie.net/wowpedia/images/c/c9/Thunderfury%2C_Blessed_Blade_of_the_Windseeker.JPG"
    );
    expect(cartItem.getQuantity().toValue()).toBe(5);
  });

  it("should increase quantity correctly up to MAX_QUANTITY", () => {
    const increased = cartItem.increaseQuantity();
    expect(increased.getQuantity().toValue()).toBe(6);

    // Increase to max
    let maxed = increased;
    for (let i = 0; i < 10; i++) {
      maxed = maxed.increaseQuantity();
    }
    expect(maxed.getQuantity().toValue()).toBe(CartItem.MAX_QUANTITY);

    // Cannot exceed MAX_QUANTITY
    const stillMax = maxed.increaseQuantity();
    expect(stillMax.getQuantity().toValue()).toBe(CartItem.MAX_QUANTITY);
  });

  it("should decrease quantity correctly down to MIN_QUANTITY", () => {
    const decreased = cartItem.decreaseQuantity();
    expect(decreased.getQuantity().toValue()).toBe(4);

    // Decrease to min
    let minItem = new CartItem(PRODUCT, new Quantity(3));
    for (let i = 0; i < 10; i++) {
      minItem = minItem.decreaseQuantity();
    }
    expect(minItem.getQuantity().toValue()).toBe(CartItem.MIN_QUANTITY);

    // Cannot go below MIN_QUANTITY
    const stillMin = minItem.decreaseQuantity();
    expect(stillMin.getQuantity().toValue()).toBe(CartItem.MIN_QUANTITY);
  });

  it("should update quantity and clamp between min and max", () => {
    const tooLow = new Quantity(0);
    const updatedLow = cartItem.updateQuantity(tooLow);
    expect(updatedLow.getQuantity().toValue()).toBe(CartItem.MIN_QUANTITY);

    const tooHigh = new Quantity(50);
    const updatedHigh = cartItem.updateQuantity(tooHigh);
    expect(updatedHigh.getQuantity().toValue()).toBe(CartItem.MAX_QUANTITY);

    const valid = new Quantity(7);
    const updatedValid = cartItem.updateQuantity(valid);
    expect(updatedValid.getQuantity().toValue()).toBe(7);
  });

  it("should calculate total price correctly", () => {
    const cart = new CartItem(PRODUCT, new Quantity(3));
    const total = cart.totalPrice();
    expect(total.toAmount()).toBe(1455);
  });
});
