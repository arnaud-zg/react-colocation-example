import { useEffect, useState } from "react";
import {
  type WelcomeModalSurvey,
  WelcomeModalSurveySchema,
} from "./WelcomeModal.types";

const LOCAL_STORAGE_KEY = "welcome_modal_seen";
const EVENT_TYPE = `local-storage:${LOCAL_STORAGE_KEY}`;

export const getWelcomeModalSurvey = (): WelcomeModalSurvey | null => {
  const rawData = localStorage.getItem(LOCAL_STORAGE_KEY);

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

export const saveWelcomeSurvey = (data: WelcomeModalSurvey): void => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
  window.dispatchEvent(new Event(EVENT_TYPE));
};

export const useWelcomeModalSurvey = () => {
  const [welcomeModalSurvey, setWelcomeModalSurvey] = useState(
    getWelcomeModalSurvey()
  );

  useEffect(() => {
    const handlerWelcomeModalSurveyChange = () => {
      console.log("HERE");
      setWelcomeModalSurvey(getWelcomeModalSurvey());
    };

    window.addEventListener(EVENT_TYPE, handlerWelcomeModalSurveyChange);

    return () =>
      window.removeEventListener(EVENT_TYPE, handlerWelcomeModalSurveyChange);
  }, []);

  return { welcomeModalSurvey };
};
