import type { WelcomeModalSurvey } from "../WelcomeModal.types";

export interface WelcomeStorageRepository {
  getSurvey(): WelcomeModalSurvey | null;
  saveSurvey(data: WelcomeModalSurvey): void;
  subscribe(callback: VoidFunction): VoidFunction;
}
