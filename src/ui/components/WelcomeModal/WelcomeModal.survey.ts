import type { WelcomeSurveyData } from "@/domain/welcomeSurvey/WelcomeSurvey.data";
import type { WelcomeStorageRepository } from "@/domain/welcomeSurvey/WelcomeSurveyStorage.repository";
import { useEffect, useState } from "react";
import { LocalStorageWelcomeSurveyRepository } from "./WelcomeStorage/LocalStorageWelcomeSurvey.repository";

export const welcomeStorage: WelcomeStorageRepository =
  new LocalStorageWelcomeSurveyRepository();

export const useWelcomeModalSurvey = () => {
  const [survey, setSurvey] = useState(welcomeStorage.getSurvey());

  useEffect(() => {
    const unsubscribe = welcomeStorage.subscribe(() => {
      setSurvey(welcomeStorage.getSurvey());
    });

    return unsubscribe;
  }, []);

  const saveSurvey = (data: WelcomeSurveyData) => {
    welcomeStorage.saveSurvey(data);
  };

  return { survey, saveSurvey };
};
