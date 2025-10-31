import { z } from "zod";

export const WelcomeSurveyDataSchema = z.object({
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

export type WelcomeSurveyData = z.infer<typeof WelcomeSurveyDataSchema>;
