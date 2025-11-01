import { describe, expect, it, vi } from "vitest";
import { WelcomeSurvey } from "../WelcomeSurvey";
import type { WelcomeSurveyData } from "../WelcomeSurvey.data";
import type { WelcomeStorageRepository } from "../WelcomeSurveyStorage.repository";
import { Skill } from "../value-objects/Skill";

class MockWelcomeStorageRepository implements WelcomeStorageRepository {
  saved: WelcomeSurveyData | null = null;
  getSurvey = vi.fn(() => this.saved);
  saveSurvey = vi.fn((data: WelcomeSurveyData) => {
    this.saved = data;
  });
  subscribe = vi.fn(() => () => {});
}

describe("WelcomeSurvey", () => {
  it("should start with undefined skill when not initialized", () => {
    const welcomeStorage = new MockWelcomeStorageRepository();
    const survey = new WelcomeSurvey(welcomeStorage);

    expect(survey.skillLevel()).toBeUndefined();
  });

  it("should save survey and return a new immutable WelcomeSurvey instance", () => {
    const welcomeStorage = new MockWelcomeStorageRepository();

    const survey = new WelcomeSurvey(welcomeStorage);
    const updatedSurvey = survey.saveSurvey({ skill: "expert" });

    expect(welcomeStorage.saveSurvey).toHaveBeenCalledWith({ skill: "expert" });

    expect(updatedSurvey.skillLevel()).toBeInstanceOf(Skill);
    expect(updatedSurvey.skillLevel()?.level()).toBe("expert");

    expect(survey.skillLevel()).toBeUndefined();

    expect(updatedSurvey).not.toBe(survey);
  });

  it("should allow repository data to be retrieved through the mock", () => {
    const welcomeStorage = new MockWelcomeStorageRepository();
    const survey = new WelcomeSurvey(welcomeStorage);

    survey.saveSurvey({ skill: "intermediate" });

    const saved = welcomeStorage.getSurvey();

    expect(saved).toEqual({ skill: "intermediate" });
  });
});
