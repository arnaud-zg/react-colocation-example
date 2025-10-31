import { useEffect, useRef } from "react";
import { WelcomeModal } from "./WelcomeModal";
import type { WelcomeModalHandle } from "./WelcomeModal.types";

export const useWelcomeModalHandle = () => {
  const ref = useRef<WelcomeModalHandle>({
    open: () => {},
    close: () => {},
  });
  const { survey: welcomeModalSurvey } = WelcomeModal.useWelcomeModalSurvey();
  const hasSubmittedData = !!welcomeModalSurvey;

  useEffect(() => {
    if (!hasSubmittedData) {
      ref.current?.open();
    }
  }, [hasSubmittedData]);

  return { ref };
};
