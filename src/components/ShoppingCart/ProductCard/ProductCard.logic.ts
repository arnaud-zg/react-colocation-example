import type { KnowledgeProfile } from "@/types/Product";
import type { WelcomeModalSurvey } from "../../WelcomeModal/WelcomeModal.types";

export const ProductCardLogic = {
  selectProfile: (skill: WelcomeModalSurvey["skill"]): KnowledgeProfile => {
    switch (skill) {
      case "expert":
        return "expert";
      case "intermediate":
        return "adventurer";
      default:
        return "beginning";
    }
  },
};
