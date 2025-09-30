import { useEffect, useRef } from "react";
import { getWelcomeModalSurvey } from "./WelcomeModal.storage";
import type {
  WelcomeModalHandle,
  WelcomeModalSurvey,
} from "./WelcomeModal.types";

export const useWelcomeModalHandle = () => {
  const ref = useRef<WelcomeModalHandle>({
    open: () => {},
    close: () => {},
  });
  const welcomeModalSurvey = getWelcomeModalSurvey();
  const hasSubmittedData = !!welcomeModalSurvey;

  useEffect(() => {
    if (!hasSubmittedData) {
      ref.current?.open();
    }
  }, [hasSubmittedData]);

  return { ref };
};

export const selectSkillLabels = (
  skill: WelcomeModalSurvey["skill"]
): string => {
  switch (skill) {
    case "beginner":
      return "✨ Beginner Explorer";
    case "intermediate":
      return "🧙‍♂️ Adept Seeker";
    case "expert":
      return "🌌 Master Mystic";

    default:
      throw new Error(
        `selectSkillLabels: Unknown skill "${skill}". Expected "beginner", "intermediate", or "expert".`
      );
  }
};
