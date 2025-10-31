import type { KnowledgeProfile } from "@/domain/cart/value-objects/Product/Product";
import type { WelcomeSurveyData } from "@/domain/welcomeSurvey/WelcomeSurvey.data";

export const ProductCardLogic = {
  selectProfile: (skill: WelcomeSurveyData["skill"]): KnowledgeProfile => {
    switch (skill) {
      case "expert":
        return "expert";
      case "intermediate":
        return "adventurer";
      default:
        return "beginner";
    }
  },
};
