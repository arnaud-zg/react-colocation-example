import {
  type WelcomeSurveyData,
  WelcomeSurveyDataSchema,
} from "@/domain/welcomeSurvey/WelcomeSurvey.data";
import type {
  Listener,
  WelcomeStorageRepository,
} from "@/domain/welcomeSurvey/WelcomeSurveyStorage.repository";

export class LocalStorageWelcomeSurveyRepository
  implements WelcomeStorageRepository
{
  private static readonly STORAGE_KEY = "welcome_survey";

  private listeners = new Set<Listener>();
  private cache: WelcomeSurveyData | null | undefined = undefined;

  getSurvey = (): WelcomeSurveyData | null => {
    if (this.cache !== undefined) {
      return this.cache;
    }

    const rawData = localStorage.getItem(
      LocalStorageWelcomeSurveyRepository.STORAGE_KEY
    );
    if (!rawData) {
      this.cache = null;
      return null;
    }

    try {
      const parsed = WelcomeSurveyDataSchema.safeParse(JSON.parse(rawData));
      this.cache = parsed.success ? parsed.data : null;
    } catch {
      this.cache = null;
    }

    return this.cache;
  };

  saveSurvey = (data: WelcomeSurveyData): void => {
    try {
      localStorage.setItem(
        LocalStorageWelcomeSurveyRepository.STORAGE_KEY,
        JSON.stringify(data)
      );

      this.cache = data;

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
