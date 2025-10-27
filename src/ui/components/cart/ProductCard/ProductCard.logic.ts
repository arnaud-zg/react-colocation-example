import type { KnowledgeProfile } from "@/domain/cart/value-objects/Product/Product";
import type { WelcomeModalSurvey } from "../../WelcomeModal/WelcomeModal.types";

export const ProductCardLogic = {
  selectProfile: (skill: WelcomeModalSurvey["skill"]): KnowledgeProfile => {
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
