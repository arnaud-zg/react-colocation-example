import type { WelcomeSurveyData } from "./WelcomeSurvey.data";

export interface WelcomeStorageRepository {
  getSurvey(): WelcomeSurveyData | null;
  saveSurvey(data: WelcomeSurveyData): void;
  subscribe(callback: VoidFunction): VoidFunction;
}

export type Listener = () => void;
