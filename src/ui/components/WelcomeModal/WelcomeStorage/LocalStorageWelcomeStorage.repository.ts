import {
  type WelcomeModalSurvey,
  WelcomeModalSurveySchema,
} from "../WelcomeModal.types";
import type { WelcomeStorageRepository } from "./WelcomeStorage.repository";

export class LocalStorageWelcomeStorageRepository
  implements WelcomeStorageRepository
{
  private static LOCAL_STORAGE_KEY = "welcome_modal_seen";
  private static EVENT_TYPE = `local-storage:${LocalStorageWelcomeStorageRepository.LOCAL_STORAGE_KEY}`;

  getSurvey(): WelcomeModalSurvey | null {
    const rawData = localStorage.getItem(
      LocalStorageWelcomeStorageRepository.LOCAL_STORAGE_KEY
    );
    if (!rawData) return null;

    try {
      const data = JSON.parse(rawData);
      const { data: survey } = WelcomeModalSurveySchema.safeParse(data);
      return survey || null;
    } catch {
      return null;
    }
  }

  saveSurvey(data: WelcomeModalSurvey): void {
    localStorage.setItem(
      LocalStorageWelcomeStorageRepository.LOCAL_STORAGE_KEY,
      JSON.stringify(data)
    );
    window.dispatchEvent(
      new Event(LocalStorageWelcomeStorageRepository.EVENT_TYPE)
    );
  }

  subscribe(callback: () => void): () => void {
    const handler = () => callback();
    window.addEventListener(
      LocalStorageWelcomeStorageRepository.EVENT_TYPE,
      handler
    );
    return () =>
      window.removeEventListener(
        LocalStorageWelcomeStorageRepository.EVENT_TYPE,
        handler
      );
  }
}
