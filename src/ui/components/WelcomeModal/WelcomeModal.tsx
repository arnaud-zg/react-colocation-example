import { useForm } from "@tanstack/react-form";
import { type Ref, useImperativeHandle, useState } from "react";

import type {
  WelcomeModalHandle,
  WelcomeModalProps,
} from "./WelcomeModal.types";

import { WelcomeSurveyDataSchema } from "@/domain/welcomeSurvey/WelcomeSurvey.data";
import { Skill } from "@/domain/welcomeSurvey/value-objects/Skill";
import { Button } from "@/ui/primitives/button";
import {
  Modal,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from "@/ui/primitives/modal";
import { forwardRef } from "react";
import { useWelcomeModalHandle } from "./WelcomeModal.logic";
import { useWelcomeModalSurvey } from "./WelcomeModal.survey";
import type { WelcomeModalComponentType } from "./WelcomeModal.types";

export type { WelcomeModalHandle } from "./WelcomeModal.types";

const WelcomeModalComponent = (
  { title, description, actionLabel = "Continue" }: WelcomeModalProps,
  ref: Ref<WelcomeModalHandle>
) => {
  const [isOpen, setIsOpen] = useState(false);
  const { welcomeSurvey, saveSurvey } = WelcomeModal.useWelcomeModalSurvey();

  const form = useForm({
    defaultValues: welcomeSurvey,
    onSubmit: async ({ value: survey }) => {
      if (!survey) return;

      saveSurvey(survey);
      setIsOpen(false);
    },
  });

  useImperativeHandle(ref, () => ({
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
  }));

  return (
    <Modal open={isOpen} onOpenChange={setIsOpen}>
      <ModalContent className="sm:max-w-md">
        <ModalHeader>
          <ModalTitle>{title}</ModalTitle>
          <ModalDescription>{description}</ModalDescription>
        </ModalHeader>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <div className="mb-5">
            <form.Field
              name="skill"
              validators={{
                onChange: ({ value }) => {
                  const { success } =
                    WelcomeSurveyDataSchema.shape.skill.safeParse(value);

                  if (success) return;
                  return "Please select a valid skill level.";
                },
              }}
            >
              {(field) => (
                <>
                  <label
                    htmlFor={field.name}
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Your knowledge level:
                  </label>
                  <select
                    aria-invalid={!!field.state.meta.errors?.length}
                    aria-describedby={`${field.name}-error`}
                    id={field.name}
                    value={field.state.value}
                    onChange={(e) => {
                      const { data: safeValue } =
                        WelcomeSurveyDataSchema.shape.skill.safeParse(
                          e.target.value
                        );

                      if (!safeValue) return;
                      field.handleChange(safeValue);
                    }}
                    className="w-full rounded-md border border-gray-300 p-2 text-sm text-gray-800 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-300"
                  >
                    <option value="">-- Select knowledge level --</option>
                    <option value="beginner">
                      {new Skill("beginner").label()}
                    </option>
                    <option value="intermediate">
                      {new Skill("intermediate").label()}
                    </option>
                    <option value="expert">
                      {new Skill("expert").label()}
                    </option>
                  </select>
                  {field.state.meta.isTouched &&
                    field.state.meta.errors?.[0] && (
                      <p
                        id={`${field.name}-error`}
                        className="mt-1 text-sm text-red-500"
                      >
                        {field.state.meta.errors[0]}
                      </p>
                    )}
                </>
              )}
            </form.Field>
          </div>

          <ModalFooter>
            <form.Subscribe
              selector={(state) => state.isValid && !state.isPristine}
            >
              {(canSubmit) => (
                <Button
                  type="submit"
                  disabled={!canSubmit}
                  className={`w-full ${!canSubmit && "cursor-not-allowed bg-gray-300 text-gray-500"}`}
                  size="default"
                >
                  {actionLabel}
                </Button>
              )}
            </form.Subscribe>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export const WelcomeModal = Object.assign(forwardRef(WelcomeModalComponent), {
  useWelcomeModalHandle,
  useWelcomeModalSurvey,
  displayName: "WelcomeModal",
}) satisfies WelcomeModalComponentType;
