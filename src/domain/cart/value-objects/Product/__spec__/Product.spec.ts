import { describe, expect, it } from "vitest";
import { Money } from "../../Money";
import {
  ImageUrl,
  KnowledgeContent,
  Product,
  ProductId,
  ProductName,
} from "../Product";
import {
  Effect,
  ExtraResources,
  ProfileDetails,
  Stats,
} from "../ProductDetails";

describe("Product Value Objects", () => {
  it("should create a ProductId and return value", () => {
    const productId = new ProductId("abc123");
    expect(productId.toValue()).toBe("abc123");
    expect(() => new ProductId("")).toThrow("Product ID cannot be empty");
  });

  it("should create a ProductName and return value", () => {
    const productName = new ProductName("Sword");
    expect(productName.toValue()).toBe("Sword");
    expect(() => new ProductName("")).toThrow("Product name cannot be empty");
  });

  it("should create an ImageUrl and return value", () => {
    const imageUrl = new ImageUrl("http://image.link");
    expect(imageUrl.toValue()).toBe("http://image.link");
    expect(() => new ImageUrl("")).toThrow("Image URL cannot be empty");
  });
});

describe("KnowledgeContent and Product", () => {
  const stats = new Stats(10, 20, 5);
  const effects = [new Effect("Fire damage")];
  const extraResources = new ExtraResources(
    "https://lore.link",
    "https://video.link"
  );
  const profile = new ProfileDetails(
    "A legendary sword",
    stats,
    effects,
    extraResources
  );

  const knowledge = new KnowledgeContent(profile, profile, profile);

  const product = new Product(
    new ProductId("sword01"),
    new ProductName("Excalibur"),
    new Money(500),
    new ImageUrl("http://image.link"),
    knowledge
  );

  it("should return correct product info", () => {
    expect(product.displayId()).toBe("sword01");
    expect(product.displayName()).toBe("Excalibur");
    expect(product.displayPrice().toAmount()).toBe(500);
    expect(product.displayImage()).toBe("http://image.link");
  });

  it("should return profile description, effects, stats, lore link, and video URL", () => {
    const levels: ("beginner" | "adventurer" | "expert")[] = [
      "beginner",
      "adventurer",
      "expert",
    ];

    for (const level of levels) {
      expect(product.describeProfile(level)).toBe("A legendary sword");
      expect(product.listProfileEffects(level)).toEqual(["Fire damage"]);
      expect(product.getProfileStats(level)).toEqual({
        power: 10,
        durability: 20,
        manaBoost: 5,
      });
      expect(product.getLoreLink(level)).toBe("https://lore.link");
      expect(product.getVideoUrl(level)).toBe("https://video.link");
    }
  });
});
