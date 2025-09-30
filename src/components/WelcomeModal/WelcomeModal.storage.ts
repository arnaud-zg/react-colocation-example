import { useEffect, useState } from "react";
import {
  type WelcomeModalSurvey,
  WelcomeModalSurveySchema,
} from "./WelcomeModal.types";

export class WelcomeModalStorageLogic {
  static LOCAL_STORAGE_KEY = "welcome_modal_seen";
  static EVENT_TYPE = `local-storage:${WelcomeModalStorageLogic.LOCAL_STORAGE_KEY}`;

  static getWelcomeModalSurvey = (): WelcomeModalSurvey | null => {
    const rawData = localStorage.getItem(
      WelcomeModalStorageLogic.LOCAL_STORAGE_KEY
    );

    if (!rawData) {
      return null;
    }

    try {
      const data = JSON.parse(rawData);
      const { data: welcomeModalSurvey } =
        WelcomeModalSurveySchema.safeParse(data);

      return welcomeModalSurvey || null;
    } catch {
      return null;
    }
  };

  static saveWelcomeSurvey = (data: WelcomeModalSurvey): void => {
    localStorage.setItem(
      WelcomeModalStorageLogic.LOCAL_STORAGE_KEY,
      JSON.stringify(data)
    );
    window.dispatchEvent(new Event(WelcomeModalStorageLogic.EVENT_TYPE));
  };
}

export const useWelcomeModalSurvey = () => {
  const [welcomeModalSurvey, setWelcomeModalSurvey] = useState(
    WelcomeModalStorageLogic.getWelcomeModalSurvey()
  );

  useEffect(() => {
    const handlerWelcomeModalSurveyChange = () => {
      setWelcomeModalSurvey(WelcomeModalStorageLogic.getWelcomeModalSurvey());
    };

    window.addEventListener(
      WelcomeModalStorageLogic.EVENT_TYPE,
      handlerWelcomeModalSurveyChange
    );

    return () =>
      window.removeEventListener(
        WelcomeModalStorageLogic.EVENT_TYPE,
        handlerWelcomeModalSurveyChange
      );
  }, []);

  return { welcomeModalSurvey };
};
