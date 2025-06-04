import useActions from "@/store/actions";
import { useAppSelector } from "@/store/hooks";
import * as React from "react";
import { z } from "zod";
import ensureError from "@/lib/ensure-error";
import { toast } from "sonner";
import useCustomNavigation from "@/hooks/use-navigation";
import { DocumentTypes } from "@/types/user-document.types";
import uploadUserDocument from "@/services/settings/documents/upload-user-document";

const validation = z.object({
  document_type: z.enum(DocumentTypes),
  document: z.instanceof(File, { message: "File is required" }),
  id_number: z
    .string()
    .min(8, "Id number must be at least 8 characters long")
    .optional()
    .or(z.literal("")),
  address: z
    .string()
    .trim()
    .min(5, "Address must be at least 5 characters ")
    .optional()
    .or(z.literal("")),
});
type FormData = z.infer<typeof validation>;

const init: FormData = {
  document_type: "" as FormData["document_type"],
  document: {} as File,
  id_number: "",
  address: "",
};
export default function useUploadDocument() {
  const { dialog } = useAppSelector((state) => state.ui);
  const [isLoading, setIsLoading] = React.useState(false);
  const [formData, setFormData] = React.useState(init);
  const [uploadType, setUploadType] = React.useState("");
  const { queryParams } = useCustomNavigation();
  const { ui } = useActions();

  const open = React.useMemo(() => {
    return dialog.show && dialog.type === "upload_documents";
  }, [dialog.show, dialog.type]);

  const updateForm = (name: keyof typeof formData, value: string | File) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const reset = () => {
    if (isLoading) return;
    setFormData(init);
    queryParams.delete("action");
  };

  const toggleDrawer = (value: boolean) => {
    ui.changeDialog({
      show: value,
      type: "",
    });
    reset();
  };

  const changeUploadType = (value: string) => {
    setUploadType(value);
    setFormData(init);
  };

  const submit = async () => {
    if (formData.document_type === "proof_of_address" && !formData.address) {
      toast.error("Address is required");
      return;
    }
    setIsLoading(true);
    try {
      const formValues = validation.parse(formData);

      const formDataToSend = new FormData();
      formDataToSend.append("document_type", formValues.document_type);
      formDataToSend.append("document", formValues.document);
      if (formValues.id_number) {
        formDataToSend.append("id_number", formValues.id_number);
      }
      if (formValues.address) {
        formDataToSend.append("address", formValues.address);
      }
      await uploadUserDocument(formDataToSend);

      showSuccessDialog();
    } catch (error) {
      const errMsg = ensureError(error).message;

      toast.error(errMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const showSuccessDialog = () => {
    const data = {
      title: "Successful!!",
      subtitle: "Document has been uploaded successfully, ",
    };

    ui.changeDialog({
      show: true,
      type: "success_dialog",
      data,
      dismiss: () => toggleDrawer(false),
    });
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
