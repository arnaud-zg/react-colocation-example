import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { WelcomeSurveyData } from "@/domain/welcomeSurvey/WelcomeSurvey.data";
import type { WelcomeStorageRepository } from "@/domain/welcomeSurvey/WelcomeSurveyStorage.repository";

interface WelcomeModalState {
  survey: WelcomeSurveyData | null;
  setSurvey: (data: WelcomeSurveyData) => void;
}

// Zustand repository for Welcome Modal
export class ZustandWelcomeSurveyRepository
  implements WelcomeStorageRepository
{
  private store = create<WelcomeModalState>()(
    persist(
      (set) => ({
        survey: null,
        setSurvey: (data) => set({ survey: data }),
      }),
      { name: "welcome_modal" }
    )
  );

  getSurvey(): WelcomeSurveyData | null {
    return this.store.getState().survey;
  }

  saveSurvey(data: WelcomeSurveyData): void {
    this.store.getState().setSurvey(data);
  }

  subscribe(callback: () => void): () => void {
    let prevSurvey = this.store.getState().survey;

    const unsub = this.store.subscribe((state) => {
      if (state.survey !== prevSurvey) {
        prevSurvey = state.survey;
        callback();
      }
    });

    return unsub;
  }
}
