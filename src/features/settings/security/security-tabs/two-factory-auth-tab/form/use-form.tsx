import ensureError from "@/lib/ensure-error";
import get2faActivationCode from "@/services/account/get-2fa-activation-code";
import verify2fa from "@/services/account/verify-2fa";
import useActions from "@/store/actions";
import * as React from "react";
import { useQuery } from "react-query";
import { toast } from "sonner";
import { z } from "zod";

const validation = z.object({
  token: z
    .string({
      message: "token is required",
    })
    .trim()
    .min(6, "token must be at least 6 characters"),
});

type FormData = z.infer<typeof validation>;

const init: FormData = {
  token: "",
};

export default function useForm() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [formData, setFormData] = React.useState(init);
  const { ui } = useActions();

  const { isFetching, isError, error, data } = useQuery(
    ["2fa-activation-code"],
    () => get2faActivationCode(),
  );

  const reset = () => {
    if (isLoading) return;
    setFormData(init);
  };

  const updateForm = (
    name: keyof typeof formData,
    e: React.ChangeEvent<HTMLInputElement> | string,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [name]: typeof e === "string" ? e : e.target.value,
    }));
  };

  const copy = async () => {
    if (!data?.secret) return;
    try {
      await navigator.clipboard.writeText(data.secret.trim());
      toast.info("Text copied to clipboard");
    } catch (error) {
      const errMsg = ensureError(error).message;

      toast.warning(errMsg);
    }
  };

  const showQrCode = () => {
    if (!data) return;
    ui.changeDialog({
      show: true,
      type: "show_2fa_qr_code",
      data: {
        qr_code_url: data.qr_code_url.original,
      },
    });
  };

  const submit = async () => {
    setIsLoading(true);
    try {
      const formValues = validation.parse(formData);

      await verify2fa(formValues);
      showSuccess();
      reset();
    } catch (error) {
      const errMsg = ensureError(error).message;
      toast.error(errMsg);
    } finally {
      setIsLoading(false);
    }
  };

  function showSuccess() {
    const data = {
      title: "Successful!!",
      subtitle: "Two-Factor Authentication has been enabled successfully",
    };

    ui.changeDialog({
      show: true,
      type: "success_dialog",
      data,
    });
  }

  return {
    isLoading,
    isFetching,
    isError,
    error,
    data,
    formData,
    copy,
    reset,
    showQrCode,
    updateForm,
    submit,
  };
}
