/**
 * Immutable shopping welcome survey that encapsulates its behavior and state.
 */

import type { WelcomeSurveyData } from "./WelcomeSurvey.data";

export class WelcomeSurvey {
  static selectSkillLabel(skill: WelcomeSurveyData["skill"]): string {
    switch (skill) {
      case "beginner":
        return "✨ Beginner Explorer";
      case "intermediate":
        return "🧙‍♂️ Adept Seeker";
      case "expert":
        return "🌌 Master Mystic";

      default:
        throw new Error(
          `selectSkillLabel: Unknown skill "${skill}". Expected "beginner", "intermediate", or "expert".`
        );
    }
  }
}
