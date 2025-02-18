import SelectBox from "@/components/select-box";
import useForm from "./use-form";
import Render from "@/components/render";
import * as React from "react";
import { Input } from "@/components/ui/form-input";
import AppButton from "@/components/app-button";

export default function Form() {
  const {
    isFetching,
    isError,
    error,
    isLoading,
    errorMsg,
    formData,
    securityQuestions,
    updateForm,
    enterPinDialog,
  } = useForm();

  const options1 = React.useMemo(() => {
    return securityQuestions.map((item) => ({
      title: item.security_question,
      value: String(item.id),
    }));
  }, [securityQuestions]);

  const options2 = React.useMemo(() => {
    return securityQuestions
      .filter((item) => item.id !== Number(formData.question_1))
      .map((item) => ({
        title: item.security_question,
        value: String(item.id),
      }));
  }, [formData.question_1, securityQuestions]);

  return (
    <form className="flex h-full flex-col space-y-5 lg:w-1/2">
      {errorMsg && <p className="error-message">{errorMsg}</p>}
      <Render
        isLoading={isFetching}
        isError={isError}
        error={error}
        loadingPosition="top"
      >
        <SelectBox
          name="question_1"
          label="Select your first security question"
          placeholder="Pick a question"
          value={String(formData.question_1)}
          onchange={(e) => updateForm("question_1", e)}
          options={options1}
          disabled={isLoading}
        />
        <Input
          name="answer_1"
          label="Answer your first security question"
          placeholder="Answer"
          value={formData.answer_1}
          onChange={(e) => updateForm("answer_1", e)}
          disabled={!formData.question_1 || isLoading}
        />

        <SelectBox
          name="question_2"
          label="Select your second security question"
          placeholder="Pick a question"
          value={String(formData.question_2)}
          onchange={(e) => updateForm("question_2", e)}
          options={options2}
          disabled={!formData.answer_1.length || isLoading}
        />

        <Input
          name="answer_2"
          label="Answer your second security question"
          placeholder="Answer"
          value={formData.answer_2}
          onChange={(e) => updateForm("answer_2", e)}
          disabled={!formData.question_2 || isLoading}
        />

        <AppButton
          variant="primary"
          className="rounded-lg"
          onClick={enterPinDialog}
          isLoading={isLoading}
        >
          Save
        </AppButton>
      </Render>
    </form>
  );
}
