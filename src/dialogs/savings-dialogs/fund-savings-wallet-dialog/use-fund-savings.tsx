import { queryClient } from "@/config/query-client-config";
import useCustomNavigation from "@/hooks/use-navigation";
import ensureError from "@/lib/ensure-error";
import fundSavingsWallet from "@/services/savings/fund-savings-wallet";
import useActions from "@/store/actions";
import useAppSelectors from "@/store/use-app-selectors";
import {
  savingsFundingPreference,
  savingsFundingSources,
} from "@/types/savings.types";
import * as React from "react";
import { toast } from "sonner";
import { z } from "zod";

const validation = z.object({
  amount: z.number().gte(1000, "amount can not be less than 1000"),
  funding_source: z.enum(savingsFundingSources, {
    message: `funding source must be either ${savingsFundingSources}`,
  }),
});

type FormData = z.infer<typeof validation>;

const init: FormData = {
  amount: 1000,
  funding_source: "" as FormData["funding_source"],
};

export default function useFundSavings() {
  const { dialog } = useAppSelectors("ui");
  const { currency, account } = useAppSelectors("account");
  const [formData, setFormData] = React.useState(init);
  const [isLoading, setIsLoading] = React.useState(false);

  const { navigate, queryParams } = useCustomNavigation();
  const { ui: uiActions } = useActions();

  const open = React.useMemo(() => {
    return dialog.show && dialog.type === "fund_savings";
  }, [dialog.show, dialog.type]);

  const updateForm = (name: keyof typeof formData, value: string | Date) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const reset = () => {
    if (isLoading) return;
    queryParams.delete("action");
    // setFormData(init);
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
    if (!account.id) {
      return toast.error("Account not found, try refreshing the page");
    }

    setIsLoading(true);
    try {
      const formValues = validation.parse({
        ...formData,
        amount: Number(formData.amount),
      });

      await fundSavingsWallet({
        amount: formValues.amount,
        funding_source: formValues.funding_source,
      });

      showSuccessDialog();
    } catch (error) {
      const errMsg = ensureError(error).message;
      if (errMsg.toLocaleLowerCase().includes("insufficient")) {
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
      subtitle: "Your wallet funding has been successful.",
    };
    const dismiss = () => {
      reset();
      queryClient.invalidateQueries(["ethicoop-balance"]);
    };
    uiActions.changeDialog({
      show: true,
      type: "success_dialog",
      data,
      dismiss,
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
    formData,
    sign: currency.sign,
    fundingPreferenceOptions,
    fundingSourceOptions,
    toggleDrawer,
    updateForm,

    submit,
  };
}
