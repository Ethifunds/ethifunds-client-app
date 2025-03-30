import { variables } from "@/constants";
import useCustomNavigation from "@/hooks/use-navigation";
import useStorage from "@/hooks/use-storage";
import ensureError from "@/lib/ensure-error";
import resetPassword from "@/services/account/reset-password";
import * as React from "react";

import { toast } from "sonner";
import { z } from "zod";

const validate = z.object({
  password: z.string().trim().min(8, "password is required"),
  password_confirmation: z.string().trim().min(8, "password is required"),
});

type FormData = z.infer<typeof validate>;

const initial: FormData = {
  password: "",
  password_confirmation: "",
};

export default function useForm() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [formData, setFormData] = React.useState<FormData>(initial);
  const { data: email, deleteData } = useStorage(
    variables.STORAGE.email,
    "",
    "sessionStorage",
  );

  const { navigate } = useCustomNavigation();

  const reset = () => {
    setFormData(initial);
  };

  const updateForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.password_confirmation) {
      return toast.error("Both passwords must match!");
    }

    setIsLoading(true);
    try {
      const formValues = validate.parse(formData);

      await resetPassword({ ...formValues, email });

      deleteData();
      navigate("/recovery/reset-password/success", { replace: true });
      reset();
    } catch (error) {
      const errMsg = ensureError(error);
      toast.error(errMsg.message, {
        position: "top-right",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    formData,
    updateForm,
    submit,
  };
}
