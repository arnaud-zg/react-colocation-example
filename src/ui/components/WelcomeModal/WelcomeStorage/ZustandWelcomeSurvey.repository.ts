import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { WelcomeStorageRepository } from "@/domain/welcomeSurvey/WelcomeSurveyStorage.repository";
import {
  WELCOME_SURVEY_KEY,
  type WelcomeSurveyStoreState,
} from "@/domain/welcomeSurvey/WelcomeSurveyStore.config";

interface WelcomeModalState {
  survey: WelcomeSurveyStoreState["survey"];
  setSurvey: (data: WelcomeSurveyStoreState["survey"]) => void;
}

const useWelcomeStore = create<WelcomeModalState>()(
  persist(
    (set) => ({
      survey: null,
      setSurvey: (data) => set({ survey: data }),
    }),
    { name: WELCOME_SURVEY_KEY }
  )
);

export class ZustandWelcomeSurveyRepository
  implements WelcomeStorageRepository
{
  getSurvey = (): WelcomeSurveyStoreState["survey"] => {
    return useWelcomeStore.getState().survey;
  };

  saveSurvey = (survey: WelcomeSurveyStoreState["survey"]): void => {
    useWelcomeStore.getState().setSurvey(survey);
  };

  subscribe = (callback: () => void): (() => void) => {
    return useWelcomeStore.subscribe(callback);
  };
}
