import type { WelcomeSurveyData } from "@/domain/welcomeSurvey/WelcomeSurvey.data";
import type {
  ForwardRefExoticComponent,
  RefAttributes,
  RefObject,
} from "react";

// Reference

export type WelcomeModalHandle = {
  open: () => void;
  close: () => void;
};

// Component

export type WelcomeModalProps = {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: (data: WelcomeSurveyData) => void;
};

export type WelcomeModalStatic = {
  useWelcomeModalHandle: () => { ref: RefObject<WelcomeModalHandle | null> };
  displayName?: string;
};

export type WelcomeModalComponentType = ForwardRefExoticComponent<
  WelcomeModalProps & RefAttributes<WelcomeModalHandle>
> &
  WelcomeModalStatic;
