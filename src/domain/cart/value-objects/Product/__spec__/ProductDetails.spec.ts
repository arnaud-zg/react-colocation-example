import { describe, expect, it } from "vitest";
import {
  Effect,
  ExtraResources,
  ProfileDetails,
  Stats,
} from "../ProductDetails";

describe("ProfileDetails", () => {
  const stats = new Stats(10, 20, 5);
  const effects = [new Effect("Fire damage"), new Effect("Stun enemies")];
  const extraResources = new ExtraResources(
    "https://lore.link",
    "https://video.link"
  );
  const profile = new ProfileDetails(
    "Test description",
    stats,
    effects,
    extraResources
  );

  it("should return the correct description", () => {
    expect(profile.describe()).toBe("Test description");
  });

  it("should return stats as object", () => {
    expect(profile.getStats()).toEqual({
      power: 10,
      durability: 20,
      manaBoost: 5,
    });
  });

  it("should return a list of effect values", () => {
    expect(profile.listEffects()).toEqual(["Fire damage", "Stun enemies"]);
  });

  it("should return the correct lore link", () => {
    expect(profile.getLoreLink()).toBe("https://lore.link");
  });

  it("should return the correct video URL", () => {
    expect(profile.getVideoUrl()).toBe("https://video.link");
  });
});

describe("Stats", () => {
  it("should throw an error for negative values", () => {
    expect(() => new Stats(-1, 0, 0)).toThrow("Stats cannot be negative");
  });

  it("should increase power correctly", () => {
    const originalStats = new Stats(5, 10, 15);
    const newStats = originalStats.increasePower(7);
    expect(newStats.asObject()).toEqual({
      power: 12,
      durability: 10,
      manaBoost: 15,
    });
  });

  it("should return stats as an object", () => {
    const stats = new Stats(3, 6, 9);
    expect(stats.asObject()).toEqual({ power: 3, durability: 6, manaBoost: 9 });
  });
});

describe("Effect", () => {
  it("should return the effect value", () => {
    const effect = new Effect("Stun enemies");
    expect(effect.toValue()).toBe("Stun enemies");
  });
});

describe("ExtraResources", () => {
  it("should return the lore link and video URL", () => {
    const resources = new ExtraResources(
      "https://lore.link",
      "https://video.link"
    );
    expect(resources.getLoreLink()).toBe("https://lore.link");
    expect(resources.getVideoUrl()).toBe("https://video.link");
  });
});
