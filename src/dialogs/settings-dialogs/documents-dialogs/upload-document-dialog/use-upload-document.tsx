import useActions from "@/store/actions";
import { useAppSelector } from "@/store/hooks";
import * as React from "react";
import { z } from "zod";
import ensureError from "@/lib/ensure-error";
import { toast } from "sonner";

const validation = z.object({
  type: z.string(),
  data: z.string(),
});
type FormData = z.infer<typeof validation>;

const init: FormData = {
  type: "",
  data: "",
};
export default function useUploadDocument() {
  const { dialog } = useAppSelector((state) => state.ui);
  const [isLoading, setIsLoading] = React.useState(false);
  const [formData, setFormData] = React.useState(init);
  const [uploadType, setUploadType] = React.useState("");

  const { ui } = useActions();

  const open = React.useMemo(() => {
    return dialog.show && dialog.type === "upload_documents";
  }, [dialog.show, dialog.type]);

  const updateForm = (name: keyof typeof formData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const toggleDrawer = (value: boolean) => {
    ui.changeDialog({
      show: value,
      type: "",
    });
  };

  const changeUploadType = (value: string) => {
    setUploadType(value);
  };

  const submit = async () => {
    setIsLoading(true);
    try {
      const formValues = validation.parse(formData);

      console.log(formValues);
    } catch (error) {
      const errMsg = ensureError(error).message;

      toast.error(errMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    open,
    formData,
    uploadType,
    changeUploadType,
    updateForm,
    toggleDrawer,
    submit,
  };
}
