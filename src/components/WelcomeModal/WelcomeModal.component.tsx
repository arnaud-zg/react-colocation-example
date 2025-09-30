import { useForm } from "@tanstack/react-form";
import { type Ref, useImperativeHandle, useMemo, useState } from "react";

import {
  getWelcomeModalSurvey,
  saveWelcomeSurvey,
} from "./WelcomeModal.storage";
import {
  type WelcomeModalHandle,
  type WelcomeModalProps,
  WelcomeModalSurveySchema,
} from "./WelcomeModal.types";

import { Button } from "@/components/ui/button";
import {
  Modal,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from "@/components/ui/modal";
import { selectSkillLabels } from "./WelcomeModal.logic";

export const WelcomeModalComponent = (
  { title, description, actionLabel = "Continue", onAction }: WelcomeModalProps,
  ref: Ref<WelcomeModalHandle>
) => {
  const [isOpen, setIsOpen] = useState(false);
  const initialWelcomeModalSurvey = useMemo(getWelcomeModalSurvey, []);
  const form = useForm({
    defaultValues: initialWelcomeModalSurvey,
    onSubmit: async ({ value }) => {
      if (!value) return;

      const nextValue = {
        ...value,
        _metadata: {
          createdAt: value?._metadata?.createdAt || new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      };

      onAction?.(nextValue);
      saveWelcomeSurvey(nextValue);
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
                    WelcomeModalSurveySchema.shape.skill.safeParse(value);

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
                        WelcomeModalSurveySchema.shape.skill.safeParse(
                          e.target.value
                        );

                      if (!safeValue) return;
                      field.handleChange(safeValue);
                    }}
                    className="w-full rounded-md border border-gray-300 p-2 text-sm text-gray-800 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-300"
                  >
                    <option value="">-- Select knowledge level --</option>
                    <option value="beginner">
                      {selectSkillLabels("beginner")}
                    </option>
                    <option value="intermediate">
                      {selectSkillLabels("intermediate")}
                    </option>
                    <option value="expert">
                      {selectSkillLabels("expert")}
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
