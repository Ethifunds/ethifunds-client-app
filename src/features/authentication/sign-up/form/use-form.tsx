import { variables } from "@/constants";
import useCustomNavigation from "@/hooks/use-navigation";
import useStorage from "@/hooks/use-storage";
import ensureError from "@/lib/ensure-error";
import createAccount from "@/services/account/create-account";
import sendOtp from "@/services/account/send-otp";
import * as React from "react";

import { toast } from "sonner";
import { z } from "zod";

const validate = z.object({
  username: z.string().trim().toLowerCase().min(3, "username is required"),
  email: z.string().trim().toLowerCase().min(5, "Email is required"),
  password: z.string().trim().min(8, "password is required"),
  password_confirmation: z.string().trim().min(8, "confirmation password is required"),
});

type FormData = z.infer<typeof validate>;

const initial: FormData = {
  username: "",
  email: "",
  password: "",
  password_confirmation: "",
};

export default function useForm() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [formData, setFormData] = React.useState<FormData>(initial);
  const { setData } = useStorage(variables.STORAGE.email, "", "sessionStorage");

  const { navigate } = useCustomNavigation();

  const reset = () => {
    setFormData(initial);
  };

  const isEmailValid = React.useMemo(() => {
    if (formData.email.length < 3) return true;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(formData.email);
  }, [formData.email]);

  const updateForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSendOtp = async (email: string) => {
    setData(email);
    try {
      await sendOtp({ email });
    } catch (error) {
      const errMsg = ensureError(error);

      toast.error(errMsg.message);
    }
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isEmailValid) {
      return toast.error("Form input invalid");
    }
    if (formData.password !== formData.password_confirmation) {
      return toast.error("Both passwords must match!");
    }

    setIsLoading(true);
    try {
      const formValues = validate.parse(formData);

      const response = await createAccount({ ...formValues, terms: true });

      if (response.email) {
        handleSendOtp(response.email);
      }

      navigate("/verify-email", { replace: true });
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
    isEmailValid,
    updateForm,
    submit,
  };
}
