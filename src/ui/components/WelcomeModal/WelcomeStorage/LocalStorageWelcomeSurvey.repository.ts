import {
  type WelcomeSurveyData,
  WelcomeSurveyDataSchema,
} from "@/domain/welcomeSurvey/WelcomeSurvey.data";
import type { WelcomeStorageRepository } from "@/domain/welcomeSurvey/WelcomeSurveyStorage.repository";

export class LocalStorageWelcomeSurveyRepository
  implements WelcomeStorageRepository
{
  private static LOCAL_STORAGE_KEY = "welcome_modal_seen";
  private static EVENT_TYPE = `local-storage:${LocalStorageWelcomeSurveyRepository.LOCAL_STORAGE_KEY}`;

  getSurvey(): WelcomeSurveyData | null {
    const rawData = localStorage.getItem(
      LocalStorageWelcomeSurveyRepository.LOCAL_STORAGE_KEY
    );
    if (!rawData) return null;

    try {
      const data = JSON.parse(rawData);
      const { data: survey } = WelcomeSurveyDataSchema.safeParse(data);
      return survey || null;
    } catch {
      return null;
    }
  }

  saveSurvey(data: WelcomeSurveyData): void {
    localStorage.setItem(
      LocalStorageWelcomeSurveyRepository.LOCAL_STORAGE_KEY,
      JSON.stringify(data)
    );

    window.dispatchEvent(
      new Event(LocalStorageWelcomeSurveyRepository.EVENT_TYPE)
    );
  }

  subscribe(callback: () => void): () => void {
    const handler = () => {
      callback();
    };

    window.addEventListener(
      LocalStorageWelcomeSurveyRepository.EVENT_TYPE,
      handler
    );

    return () =>
      window.removeEventListener(
        LocalStorageWelcomeSurveyRepository.EVENT_TYPE,
        handler
      );
  }
}
