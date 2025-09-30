import type {
  ForwardRefExoticComponent,
  RefAttributes,
  RefObject,
} from "react";
import { z } from "zod";

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
  onAction?: (data: WelcomeModalSurvey) => void;
};

export type WelcomeModalStatic = {
  useWelcomeModalHandle: () => { ref: RefObject<WelcomeModalHandle | null> };
  displayName?: string;
};

export type WelcomeModalComponentType = ForwardRefExoticComponent<
  WelcomeModalProps & RefAttributes<WelcomeModalHandle>
> &
  WelcomeModalStatic;

// Data

export const WelcomeModalSurveySchema = z.object({
  skill: z.union([
    z.literal("beginner"),
    z.literal("intermediate"),
    z.literal("expert"),
  ]),
  _metadata: z
    .object({
      createdAt: z.string().datetime(),
      updatedAt: z.string().datetime(),
    })
    .optional(),
});

export type WelcomeModalSurvey = z.infer<typeof WelcomeModalSurveySchema>;
