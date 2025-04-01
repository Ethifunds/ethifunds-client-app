import ensureError from "@/lib/ensure-error";
import updatePassword from "@/services/account/update-password";
import useActions from "@/store/actions";
import useAppSelectors from "@/store/use-app-selectors";
import * as React from "react";
import { z } from "zod";

const validations = z.object({
  current_password: z.string().min(8, "Current Password is required"),
  new_password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character (e.g., @#$%^&)",
    ),
  confirm_password: z.string().min(8, "Confirm Password is Required"),
});

type FormData = z.infer<typeof validations>;

const init: FormData = {
  current_password: "",
  new_password: "",
  confirm_password: "",
};

export default function useForm() {
  const { account } = useAppSelectors("account");
  const [formData, setFormData] = React.useState(init);
  const [isLoading, setIsLoading] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState("");

  const { ui } = useActions();
  const reset = () => {
    setFormData(init);
  };

  const updateForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setErrorMsg("");
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const showSuccessDialog = () => {
    const data = {
      title: "Congratulations!!!",
      subtitle: "Your password has been changed successfully ",
    };
    ui.changeDialog({
      show: true,
      type: "success_dialog",
      data,
      action: reset,
    });
  };

  const submit = async () => {
    setErrorMsg("");

    if (!account.email) {
      return setErrorMsg(
        "Email is required for this action, try refreshing the page",
      );
    }
    if (formData.new_password === formData.current_password) {
      return setErrorMsg("Cannot use current password as new password");
    }
    if (formData.new_password !== formData.confirm_password) {
      return setErrorMsg("Both Passwords Must match");
    }

    setIsLoading(true);
    try {
      const formValues = validations.parse(formData);

      await updatePassword({
        old_password: formValues.current_password,
        new_password: formValues.new_password,
        email: account.email,
      });
      
      showSuccessDialog();
    } catch (error) {
      const err = ensureError(error);
      setErrorMsg(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    errorMsg,
    formData,
    updateForm,
    submit,
  };
}
