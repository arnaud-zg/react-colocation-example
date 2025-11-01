import { WelcomeSurveyDataSchema } from "@/domain/welcomeSurvey/WelcomeSurvey.data";
import { z } from "zod";

export const WELCOME_SURVEY_KEY = "welcome_survey";

export const WelcomeSurveyStoreStateSchema = z.object({
  survey: WelcomeSurveyDataSchema.nullable(),
});

export type WelcomeSurveyStoreState = z.infer<
  typeof WelcomeSurveyStoreStateSchema
>;
