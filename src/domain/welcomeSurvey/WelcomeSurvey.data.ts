import { z } from "zod";
import { SkillValueSchema } from "./value-objects/Skill";

export const WelcomeSurveyDataSchema = z.object({
  skill: SkillValueSchema,
});

export type WelcomeSurveyData = z.infer<typeof WelcomeSurveyDataSchema>;
