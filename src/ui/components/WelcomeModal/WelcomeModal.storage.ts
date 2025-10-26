import { useEffect, useState } from "react";
import type { WelcomeModalSurvey } from "./WelcomeModal.types";
import { LocalStorageWelcomeStorageRepository } from "./WelcomeStorage/LocalStorageWelcomeStorage.repository";
import type { WelcomeStorageRepository } from "./WelcomeStorage/WelcomeStorage.repository";

export const welcomeStorage: WelcomeStorageRepository =
  new LocalStorageWelcomeStorageRepository();

export const useWelcomeModalSurvey = (
  welcomeStorage: WelcomeStorageRepository
) => {
  const [survey, setSurvey] = useState(welcomeStorage.getSurvey());

  useEffect(() => {
    const unsubscribe = welcomeStorage.subscribe(() => {
      setSurvey(welcomeStorage.getSurvey());
    });
    return unsubscribe;
  }, [welcomeStorage]);

  const saveSurvey = (data: WelcomeModalSurvey) => {
    welcomeStorage.saveSurvey(data);
  };

  return { survey, saveSurvey };
};
