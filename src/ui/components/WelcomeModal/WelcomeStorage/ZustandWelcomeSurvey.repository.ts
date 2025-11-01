import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { WelcomeSurveyData } from "@/domain/welcomeSurvey/WelcomeSurvey.data";
import type { WelcomeStorageRepository } from "@/domain/welcomeSurvey/WelcomeSurveyStorage.repository";

interface WelcomeModalState {
  survey: WelcomeSurveyData | null;
  setSurvey: (data: WelcomeSurveyData) => void;
}

const useWelcomeStore = create<WelcomeModalState>()(
  persist(
    (set) => ({
      survey: null,
      setSurvey: (data) => set({ survey: data }),
    }),
    { name: "welcome_survey" }
  )
);

export class ZustandWelcomeSurveyRepository
  implements WelcomeStorageRepository
{
  getSurvey = (): WelcomeSurveyData | null => {
    return useWelcomeStore.getState().survey;
  };

  saveSurvey = (data: WelcomeSurveyData): void => {
    useWelcomeStore.getState().setSurvey(data);
  };

  subscribe = (callback: () => void): (() => void) => {
    return useWelcomeStore.subscribe(callback);
  };
}
