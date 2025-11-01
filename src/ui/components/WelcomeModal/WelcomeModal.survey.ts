import { WelcomeSurvey } from "@/domain/welcomeSurvey/WelcomeSurvey";
import type { WelcomeStorageRepository } from "@/domain/welcomeSurvey/WelcomeSurveyStorage.repository";
import { useImmutableInstance } from "@/lib/useImmutableInstance";
import { useSyncExternalStore } from "react";
// import { LocalStorageWelcomeSurveyRepository } from "./WelcomeStorage/LocalStorageWelcomeSurvey.repository";
import { TanStackWelcomeSurveyRepository } from "./WelcomeStorage/TanstackStoreWelcomeSurvey.repository";
// import { ZustandWelcomeSurveyRepository } from "./WelcomeStorage/ZustandWelcomeSurvey.repository";

export const welcomeStorage: WelcomeStorageRepository =
  new TanStackWelcomeSurveyRepository();

export const useWelcomeModalSurvey = () => {
  const welcomeSurvey = useSyncExternalStore(
    welcomeStorage.subscribe,
    welcomeStorage.getSurvey
  );
  const welcomeSurveyApi = useImmutableInstance(
    new WelcomeSurvey(welcomeStorage)
  );

  return {
    welcomeSurvey,
    saveSurvey: welcomeSurveyApi.saveSurvey,
  };
};
