import type {
  Listener,
  WelcomeStorageRepository,
} from "@/domain/welcomeSurvey/WelcomeSurveyStorage.repository";
import {
  WELCOME_SURVEY_KEY,
  type WelcomeSurveyStoreState,
  WelcomeSurveyStoreStateSchema,
} from "@/domain/welcomeSurvey/WelcomeSurveyStore.config";

export class LocalStorageWelcomeSurveyRepository
  implements WelcomeStorageRepository
{
  private listeners = new Set<Listener>();
  private cache: WelcomeSurveyStoreState = { survey: null };

  getSurvey = (): WelcomeSurveyStoreState["survey"] => {
    if (this.cache !== undefined) {
      return this.cache.survey;
    }

    const rawData = localStorage.getItem(WELCOME_SURVEY_KEY);

    if (!rawData) {
      this.cache = { survey: null };
      return null;
    }

    try {
      const parsed = WelcomeSurveyStoreStateSchema.safeParse(
        JSON.parse(rawData)
      );
      this.cache = parsed.success ? parsed.data : { survey: null };
    } catch {
      this.cache = { survey: null };
    }

    return this.cache.survey;
  };

  saveSurvey = (survey: WelcomeSurveyStoreState["survey"]): void => {
    try {
      const nextStoreState: WelcomeSurveyStoreState = { survey };

      localStorage.setItem(WELCOME_SURVEY_KEY, JSON.stringify(nextStoreState));
      this.cache = nextStoreState;

      for (const listener of this.listeners) {
        listener();
      }
    } catch (err) {
      console.error("Failed to save survey:", err);
    }
  };

  subscribe = (listener: Listener): (() => void) => {
    this.listeners.add(listener);

    return () => this.listeners.delete(listener);
  };
}
