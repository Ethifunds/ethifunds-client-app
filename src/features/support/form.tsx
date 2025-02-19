import AppButton from "@/components/app-button";
import Textarea from "@/components/ui/form-input/textarea";
import ensureError from "@/lib/ensure-error";
import sendSupportMessage from "@/services/support/send-support-message";
import { useAppSelector } from "@/store/hooks";
import * as React from "react";
import { toast } from "sonner";
import { z } from "zod";

const validation = z.object({
  message: z.string().min(10, "message must contain at least 10 characters"),
});
type FormData = z.infer<typeof validation>;

const init: FormData = {
  message: "",
};

export default function Form() {
  const { account } = useAppSelector((state) => state.account);
  const [formData, setFormData] = React.useState(init);
  const [isLoading, setIsLoading] = React.useState(false);

  const reset = () => {
    setFormData(init);
  };
  const updateForm = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submit = async () => {
    setIsLoading(true);
    try {
      const formValues = validation.parse(formData);
      await sendSupportMessage({ ...formValues, email: account.email });
      toast.success("Message sent successfully");
      reset();
    } catch (error) {
      const errMsg = ensureError(error).message;
      toast.error(errMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="space-y-3">
      <Textarea
        name="message"
        placeholder="Enter Message"
        value={formData.message}
        onChange={updateForm}
        rows={8}
        disabled={isLoading}
      />
      <div className="flex justify-end">
        <AppButton
          variant="primary"
          onClick={submit}
          className="w-full rounded-lg lg:w-1/3"
          isLoading={isLoading}
        >
          Send Message
        </AppButton>
      </div>
    </form>
  );
}
