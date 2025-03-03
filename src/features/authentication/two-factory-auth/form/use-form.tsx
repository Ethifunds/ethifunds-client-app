import useCustomNavigation from "@/hooks/use-navigation";
import ensureError from "@/lib/ensure-error";
import verify2fa from "@/services/account/verify-2fa";
import * as React from "react";

import { toast } from "sonner";
import { z } from "zod";

const validate = z.object({
  token: z.string().trim().min(6, "Otp is required"),
});

type FormData = z.infer<typeof validate>;

const initial: FormData = {
  token: "",
};
export default function useForm() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [formData, setFormData] = React.useState<FormData>(initial);
  const [errorMsg, setErrorMsg] = React.useState("");
  const { navigate } = useCustomNavigation();

  const updateForm = (e: string) => {
    setFormData((prev) => ({
      ...prev,
      token: e,
    }));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const formValues = validate.parse(formData);

      const response = await verify2fa(formValues);

      if (response) return navigate("/home", { replace: true });
      throw new Error("error verifying code");
    } catch (error) {
      const errMsg = ensureError(error);
      setErrorMsg(errMsg.message);
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
    errorMsg,
    updateForm,
    submit,
  };
}
