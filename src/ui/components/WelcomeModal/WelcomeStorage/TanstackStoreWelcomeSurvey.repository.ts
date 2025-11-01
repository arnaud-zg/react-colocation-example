import { Store } from "@tanstack/store";

import type { WelcomeStorageRepository } from "@/domain/welcomeSurvey/WelcomeSurveyStorage.repository";
import {
  WELCOME_SURVEY_KEY,
  type WelcomeSurveyStoreState,
} from "@/domain/welcomeSurvey/WelcomeSurveyStore.config";

const loadInitialState = (): WelcomeSurveyStoreState => {
  try {
    const stored = localStorage.getItem(WELCOME_SURVEY_KEY);

    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error("Failed to load welcome survey from localStorage:", error);
  }
  return { survey: null };
};

const welcomeStore = new Store<WelcomeSurveyStoreState>(loadInitialState());

welcomeStore.subscribe(() => {
  try {
    localStorage.setItem(
      WELCOME_SURVEY_KEY,
      JSON.stringify(welcomeStore.state)
    );
  } catch (error) {
    console.error("Failed to save welcome survey to localStorage:", error);
  }
});

export class TanStackWelcomeSurveyRepository
  implements WelcomeStorageRepository
{
  getSurvey = (): WelcomeSurveyStoreState["survey"] => {
    return welcomeStore.state.survey;
  };

  saveSurvey = (survey: WelcomeSurveyStoreState["survey"]): void => {
    welcomeStore.setState((state) => ({
      ...state,
      survey,
    }));
  };

  subscribe = (callback: () => void): (() => void) => {
    return welcomeStore.subscribe(callback);
  };
}
