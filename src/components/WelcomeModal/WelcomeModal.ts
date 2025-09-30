import { forwardRef } from "react";
import { WelcomeModalComponent } from "./WelcomeModal.component";
import { selectSkillLabels, useWelcomeModalHandle } from "./WelcomeModal.logic";
import { useWelcomeModalSurvey } from "./WelcomeModal.storage";
import type { WelcomeModalComponentType } from "./WelcomeModal.types";

export type { WelcomeModalHandle } from "./WelcomeModal.types";

export const WelcomeModal = Object.assign(forwardRef(WelcomeModalComponent), {
  useWelcomeModalHandle,
  useWelcomeModalSurvey,
  selectSkillLabels,
  displayName: "WelcomeModal",
}) satisfies WelcomeModalComponentType;
