import { variables } from "@/constants";
import useCustomNavigation from "@/hooks/use-navigation";
import useStorage from "@/hooks/use-storage";
import ensureError from "@/lib/ensure-error";
import verifyAccountEmail from "@/services/account/verify-account-email";
import * as React from "react";

import { toast } from "sonner";
import { z } from "zod";

const validate = z.object({
	otp_code: z.string().trim().min(4, "Otp is required"),
});

type FormData = z.infer<typeof validate>;

const initial: FormData = {
	otp_code: "",
};
export default function useForm() {
	const [isLoading, setIsLoading] = React.useState(false);
	const [formData, setFormData] = React.useState<FormData>(initial);
	const [errorMsg, setErrorMsg] = React.useState("");
	const { navigate } = useCustomNavigation();
	const { data: email, deleteData } = useStorage(variables.STORAGE.email, "", "sessionStorage");

	const updateForm = (e: string) => {
    setErrorMsg("");
    setFormData((prev) => ({
      ...prev,
      otp_code: e,
    }));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setIsLoading(true);
    try {
      if (!email) throw new Error("No email found");
      const formValues = validate.parse(formData);

      await verifyAccountEmail({ email, otp_code: formValues.otp_code });

      toast.success("Email verified successfully");

      deleteData();

      navigate("/", { replace: true });
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
