import { forwardRef } from "react";
import { WelcomeModalComponent } from "./WelcomeModal.component";
import { useWelcomeModalHandle } from "./WelcomeModal.logic";
import {
  WelcomeModalStorageLogic,
  useWelcomeModalSurvey,
} from "./WelcomeModal.storage";
import type { WelcomeModalComponentType } from "./WelcomeModal.types";

export type { WelcomeModalHandle } from "./WelcomeModal.types";

export const WelcomeModal = Object.assign(forwardRef(WelcomeModalComponent), {
  useWelcomeModalHandle,
  useWelcomeModalSurvey,
  WelcomeModalStorageLogic,
  displayName: "WelcomeModal",
}) satisfies WelcomeModalComponentType;
