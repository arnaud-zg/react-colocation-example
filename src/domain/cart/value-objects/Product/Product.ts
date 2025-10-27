import type { Money } from "../Money";
import type { ProfileDetails } from "./ProductDetails";

export class ProductId {
  constructor(private readonly _value: string) {
    if (!_value) throw new Error("Product ID cannot be empty");
  }

  toValue(): string {
    return this._value;
  }
}

export class ProductName {
  constructor(private readonly _value: string) {
    if (!_value) throw new Error("Product name cannot be empty");
  }

  toValue(): string {
    return this._value;
  }
}

export class ImageUrl {
  constructor(private readonly _value: string) {
    if (!_value) throw new Error("Image URL cannot be empty");
  }

  toValue(): string {
    return this._value;
  }
}

export type KnowledgeProfile = "beginner" | "adventurer" | "expert";

export class KnowledgeContent {
  constructor(
    private readonly _beginnerProfile: ProfileDetails,
    private readonly _adventurerProfile: ProfileDetails,
    private readonly _expertProfile: ProfileDetails
  ) {}

  getProfileDescription(level: KnowledgeProfile): string {
    return this.getProfile(level).describe();
  }

  getProfileEffects(level: KnowledgeProfile): string[] {
    return this.getProfile(level).listEffects();
  }

  getProfileStats(
    level: KnowledgeProfile
  ): Record<"power" | "durability" | "manaBoost", number> {
    return this.getProfile(level).getStats();
  }

  getProfileLoreLink(level: KnowledgeProfile): string {
    return this.getProfile(level).getLoreLink();
  }

  getProfileVideoUrl(level: KnowledgeProfile): string {
    return this.getProfile(level).getVideoUrl();
  }

  private getProfile(level: KnowledgeProfile): ProfileDetails {
    if (level === "beginner") return this._beginnerProfile;
    if (level === "adventurer") return this._adventurerProfile;
    return this._expertProfile;
  }
}

export class Product {
  constructor(
    private readonly _id: ProductId,
    private readonly _name: ProductName,
    private readonly _price: Money,
    private readonly _imageUrl: ImageUrl,
    private readonly _knowledge: KnowledgeContent
  ) {}

  displayId(): string {
    return this._id.toValue();
  }

  displayName(): string {
    return this._name.toValue();
  }

  displayPrice(): Money {
    return this._price;
  }

  displayImage(): string {
    return this._imageUrl.toValue();
  }

  describeProfile(level: KnowledgeProfile): string {
    return this._knowledge.getProfileDescription(level);
  }

  listProfileEffects(level: KnowledgeProfile): string[] {
    return this._knowledge.getProfileEffects(level);
  }

  getProfileStats(
    level: KnowledgeProfile
  ): Record<"power" | "durability" | "manaBoost", number> {
    return this._knowledge.getProfileStats(level);
  }

  getLoreLink(level: KnowledgeProfile): string {
    if (level === "beginner") return this._knowledge.getProfileLoreLink(level);
    if (level === "adventurer")
      return this._knowledge.getProfileLoreLink(level);
    return this._knowledge.getProfileLoreLink(level);
  }

  getVideoUrl(level: KnowledgeProfile): string {
    if (level === "beginner") return this._knowledge.getProfileVideoUrl(level);
    if (level === "adventurer")
      return this._knowledge.getProfileVideoUrl(level);
    return this._knowledge.getProfileVideoUrl(level);
  }
}
