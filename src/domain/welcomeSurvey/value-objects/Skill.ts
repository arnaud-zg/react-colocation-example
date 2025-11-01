import { z } from "zod";

export const SkillValueSchema = z.union([
  z.literal("beginner"),
  z.literal("intermediate"),
  z.literal("expert"),
]);

export type SkillValue = z.infer<typeof SkillValueSchema>;

export class Skill {
  constructor(private skillValue: SkillValue) {}

  level(): SkillValue {
    return this.skillValue;
  }

  update(skillValue: SkillValue) {
    return new Skill(skillValue);
  }

  label(): string {
    return Skill.selectLabelFor(this.skillValue);
  }

  private static selectLabelFor(skill: SkillValue): string {
    switch (skill) {
      case "beginner":
        return "✨ Beginner Explorer";
      case "intermediate":
        return "🧙‍♂️ Adept Seeker";
      case "expert":
        return "🌌 Master Mystic";

      default:
        throw new Error(
          `selectLabelFor: Unknown skill "${skill}". Expected "beginner", "intermediate", or "expert".`
        );
    }
  }
}
