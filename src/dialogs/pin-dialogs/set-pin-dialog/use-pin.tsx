import ensureError from "@/lib/ensure-error";
import setTransactionPin from "@/services/account/set-transaction-pin";
import useActions from "@/store/actions";
import useAppSelectors from "@/store/use-app-selectors";
import * as React from "react";
import { toast } from "sonner";
import { z } from "zod";

const validation = z.object({
  pin: z.string().length(4, "Pin must be 4 characters long"),
  confirm_pin: z.string().length(4, "Confirm pin must be 4 characters long"),
});

type FormData = z.infer<typeof validation>;

const init: FormData = {
  pin: "",
  confirm_pin: "",
};

export default function usePin() {
  const { dialog } = useAppSelectors("ui");
  const { account } = useAppSelectors("account");
  const [formData, setFormData] = React.useState(init);
  const [isLoading, setIsLoading] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState("set_pin"); // set_pin, confirm_pin, pin_success,
  const [errMsg, setErrMsg] = React.useState("");

  const { ui, account: accountActions } = useActions();

  const reset = () => {
    if (isLoading) return;
    setFormData(init);
    setErrMsg("");
    setActiveTab("set_pin");
  };

  const toggleShow = (val: boolean) => {
    if (isLoading) return;
    ui.changeDialog({ show: val, type: "", id: "" });
  };

  const open = React.useMemo(() => {
    return dialog.show && dialog.type === "set_pin";
  }, [dialog.show, dialog.type]);

  const close = () => {
    toggleShow(false);
    reset();
  };

  const updateForm = (value: string, name: keyof typeof formData) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const changeTab = (tab: string) => {
    setActiveTab(tab);
  };

  const submit = async () => {
    setIsLoading(true);
    try {
      if (formData.pin !== formData.confirm_pin)
        throw new Error("Both pins must match");
      const formValues = validation.parse(formData);
      await setTransactionPin(formValues);
      accountActions.updateAccount({
        ...account,
        has_set_pin: true,
      });
      setActiveTab("pin_success");
    } catch (error) {
      const errorMsg = ensureError(error).message;
      setErrMsg(errorMsg);
      toast.error(errorMsg);
      reset();
    } finally {
      setIsLoading(false);
    }
  };

  return {
    open,
    errMsg,
    formData,
    activeTab,
    isLoading,
    close,
    submit,
    changeTab,
    updateForm,
  };
}
