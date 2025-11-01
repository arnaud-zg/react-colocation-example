/**
 * Immutable shopping welcome survey that encapsulates its behavior and state.
 */

import type { WelcomeSurveyData } from "./WelcomeSurvey.data";
import type { WelcomeStorageRepository } from "./WelcomeSurveyStorage.repository";
import { Skill } from "./value-objects/Skill";

export class WelcomeSurvey {
  constructor(
    private welcomeStorageRepository: WelcomeStorageRepository,
    private skill?: Skill
  ) {}

  skillLevel(): Skill | undefined {
    return this.skill;
  }

  saveSurvey = (survey: WelcomeSurveyData): WelcomeSurvey => {
    this.welcomeStorageRepository.saveSurvey(survey);

    return new WelcomeSurvey(
      this.welcomeStorageRepository,
      new Skill(survey.skill)
    );
  };
}
