import type { WelcomeSurveyStoreState } from "@/domain/welcomeSurvey/WelcomeSurveyStore.config";

export interface WelcomeStorageRepository {
  getSurvey(): WelcomeSurveyStoreState["survey"] | null;
  saveSurvey(data: WelcomeSurveyStoreState["survey"]): void;
  subscribe(callback: VoidFunction): VoidFunction;
}

export type Listener = () => void;
