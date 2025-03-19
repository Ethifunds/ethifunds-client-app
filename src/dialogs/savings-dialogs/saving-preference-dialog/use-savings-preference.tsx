import useCustomNavigation from "@/hooks/use-navigation";
import ensureError from "@/lib/ensure-error";
import initiateFundingCycle from "@/services/savings/initiate-funding-cycle";
import useActions from "@/store/actions";
import useAppSelectors from "@/store/use-app-selectors";
import {
  Savings,
  savingsFundingPreference,
  savingsFundingSources,
} from "@/types/savings.types";
import * as React from "react";
import { toast } from "sonner";
import { z } from "zod";

const validation = z.object({
  amount: z.number().gte(50000, "amount can not be less than 50,000"),
  contribution_date: z.date({
    message: "contribution date must be a valid date string",
  }),
  funding_source: z.enum(savingsFundingSources, {
    message: `funding source must be either ${savingsFundingSources}`,
  }),
  funding_preference: z.enum(savingsFundingPreference, {
    message: `funding source must be either ${savingsFundingPreference}`,
  }),
});

type FormData = z.infer<typeof validation>;

const init: FormData = {
  amount: 50000,
  contribution_date: new Date() as any,
  funding_source: "" as FormData["funding_source"],
  funding_preference: "" as FormData["funding_preference"],
};

export default function useSavingsPreference() {
  const { dialog } = useAppSelectors("ui");
  const { currency } = useAppSelectors("account");
  const [formData, setFormData] = React.useState(init);
  const [isLoading, setIsLoading] = React.useState(false);

  const { navigate, queryParams } = useCustomNavigation();
  const { ui: uiActions } = useActions();

  const open = React.useMemo(() => {
    return dialog.show && dialog.type === "savings_preference";
  }, [dialog.show, dialog.type]);

  const data = React.useMemo(
    () => (dialog.data ? (dialog.data as Savings) : null),
    [dialog?.data],
  );

  const updateForm = (name: keyof typeof formData, value: string | Date) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const reset = () => {
    if (isLoading) return;
    queryParams.delete("action");
    setFormData(init);
  };

  const toggleDrawer = (value: boolean) => {
    uiActions.changeDialog({
      show: value,
      type: "",
      data: null,
    });
    reset();
  };

  const submit = async () => {
    console.log(formData);
    if (!data?.ethicoop_cycle_id) {
      return toast.error("Cycle Id not found, try refreshing the page");
    }

      
    setIsLoading(true);
    try {
      const formValues = validation.parse({
        ...formData,
        amount: Number(formData.amount),
      });

      await initiateFundingCycle({
        ...formValues,
        contribution_date: formValues.contribution_date.toISOString(),
        cycle_id: data.ethicoop_cycle_id,
      });

      showSuccessDialog();
    } catch (error) {
      const errMsg = ensureError(error).message;
      if (errMsg.includes("insufficient")) {
        return insufficientFundsDialog();
      }
      toast.error(errMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const insufficientFundsDialog = () => {
    toggleDrawer(false);
    navigate("/wallet");
    uiActions.changeDialog({
      show: true,
      type: "fund_wallet",
    });
  };

  const showSuccessDialog = () => {
    const data = {
      title: "Successful!!",
      subtitle: "You have successfully Activated a savings cycle.",
    };
    uiActions.changeDialog({
      show: true,
      type: "success_dialog",
      data,
      dismiss: reset,
    });
  };

  const fundingPreferenceOptions = savingsFundingPreference.map((item) => ({
    title: item.split("_").join(" "),
    value: item,
  }));

  const fundingSourceOptions = savingsFundingSources.map((item) => ({
    title: item.split("_").join(" "),
    value: item,
  }));
  return {
    open,
    isLoading,
    data,
    formData,
    sign: currency.sign,
    fundingPreferenceOptions,
    fundingSourceOptions,
    toggleDrawer,
    updateForm,
    submit,
  };
}
