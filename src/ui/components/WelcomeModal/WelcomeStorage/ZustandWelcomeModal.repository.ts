import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { WelcomeModalSurvey } from "../WelcomeModal.types";
import type { WelcomeStorageRepository } from "./WelcomeStorage.repository";

interface WelcomeModalState {
  survey: WelcomeModalSurvey | null;
  setSurvey: (data: WelcomeModalSurvey) => void;
}

// Zustand repository for Welcome Modal
export class ZustandWelcomeStorageRepository
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

  getSurvey(): WelcomeModalSurvey | null {
    return this.store.getState().survey;
  }

  saveSurvey(data: WelcomeModalSurvey): void {
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
