import getSecurityQuestions from "@/services/account/get-security-questions";
import { useQuery } from "react-query";
import * as React from "react";
import { z } from "zod";
import { SecurityQuestion } from "@/types/security-questions.types";
import ensureError from "@/lib/ensure-error";
import setUserSecurityQuestions from "@/services/account/set-user-security-questions";
import useActions from "@/store/actions";
import { useAppSelector } from "@/store/hooks";
import useCustomNavigation from "@/hooks/use-navigation";

const validation = z.object({
  question_1: z.string().min(1, "question 1 is required"),
  question_2: z.string().min(1, "question 2 is required"),
  answer_1: z.string().min(3, "Answer 1 must be at least 3 characters long"),
  answer_2: z.string().min(3, "Answer 2 must be at least 3 characters long"),
});

type FormData = z.infer<typeof validation>;

const init: FormData = {
  question_1: "",
  question_2: "",
  answer_1: "",
  answer_2: "",
};

export default function useForm() {
  const { account } = useAppSelector((state) => state.account);
  const [formData, setFormData] = React.useState(init);
  const [securityQuestions, setSecurityQuestions] = React.useState<
    SecurityQuestion[]
  >([]);
  const { queryParams } = useCustomNavigation();
  const [isLoading, setIsLoading] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState("");
  const { ui } = useActions();

  const enable = React.useMemo(
    () => queryParams.has("sub_tab", "security_questions"),
    [queryParams],
  );

  const { isLoading: _, ...query } = useQuery(
    ["security-questions"],
    () => getSecurityQuestions(),
    {
      enabled: enable,
      onSuccess(data) {
        setSecurityQuestions(data);
      },
    },
  );

  const reset = () => {
    if (isLoading) return;
    setErrorMsg("");
    setFormData(init);
  };

  const updateForm = (
    name: keyof typeof formData,
    e: React.ChangeEvent<HTMLInputElement> | string,
  ) => {
    setErrorMsg("");
    setFormData((prev) => {
      return {
        ...prev,
        [name]: typeof e === "string" ? e : e.target.value,
      };
    });
  };

  const showSuccess = () => {
    const data = {
      title: "Congratulations!!!",
      subtitle:
        "Your account is now more secure with your personalized security question in place. Keep your answers safe and update them regularly to maintain strong protection for your account.",
    };

    ui.changeDialog({
      show: true,
      type: "success_dialog",
      action: reset,
      data,
    });
  };

  const submit = async () => {
    setErrorMsg("");
    setIsLoading(true);

    try {
      const formValues = validation.parse(formData);

      const payload = {
        email: account.email,
        questions: [
          {
            question_id: Number(formValues.question_1),
            answer: formValues.answer_1,
          },
          {
            question_id: Number(formValues.question_2),
            answer: formValues.answer_2,
          },
        ],
      };

      await setUserSecurityQuestions(payload);
      showSuccess();
    } catch (err) {
      const errMsg = ensureError(err).message;
      setErrorMsg(errMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    _,
    ...query,
    isLoading,
    errorMsg,
    formData,
    securityQuestions,
    updateForm,
    submit,
  };
}
