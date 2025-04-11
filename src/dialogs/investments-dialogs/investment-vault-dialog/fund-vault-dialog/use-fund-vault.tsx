import ensureError from "@/lib/ensure-error";
import fundVault from "@/services/investments/vault/fund-vault";
import useActions from "@/store/actions";
import { useAppSelector } from "@/store/hooks";
import * as React from "react";
import { toast } from "sonner";
import { z } from "zod";
import { amountList } from "./tabs/fund-vault-tab/data";
import useCustomNavigation from "@/hooks/use-navigation";
import getFundingSources from "@/services/extras/get-funding-sources";
import { FundingSourceTypes } from "@/types/global.types";

function fundingSources() {
  const sources: string[] = [];
  (async () => {
    try {
      const res = await getFundingSources();
      const mapped = res.map((item) => item.id);
      sources.push(...mapped);
    } catch (e) {
      console.error(e);
      throw e;
    }
  })();

  return sources;
}

const validation = z.object({
  amount: z.number().positive("Amount must be a positive number"),
  funding_source: z.custom<FundingSourceTypes>((val) => {
    const sources = fundingSources();
    return sources.length === 0 || sources.includes(val);
  }, "Funding source must be valid"),
  pin: z
    .string()
    .min(4, "Pin must be 4 characters long")
    .max(4, "Pin must not be longer than 4 characters"),
});
type FormData = z.infer<typeof validation>;

const init: FormData = {
  amount: "" as any,
  funding_source: "user_wallet",
  pin: "",
};

export type UpdateForm = (name: keyof typeof init, value: string) => void;
export type FormKeys = keyof typeof init;

export default function useFundVault() {
  const { currency } = useAppSelector((state) => state.account);
  const [formData, setFormdata] = React.useState(init);
  const [activeAmount, setActiveAmount] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState(""); // "fund_vault"| "preview" | "pin" "success" "insufficient_funds"
  const [errMsg, setErrMsg] = React.useState("");
  const { dialog } = useAppSelector((state) => state.ui);
  const { navigate, queryParams } = useCustomNavigation();

  const { ui } = useActions();

  const reset = () => {
    if (isLoading) return;
    setFormdata(init);
    setActiveAmount(0);
    setErrMsg("");
    queryParams.delete("tab");
  };

  const toggleDrawer = (val: boolean) => {
    if (isLoading) return;
    setActiveTab("");
    ui.changeDialog({ show: val, type: "", id: "" });
    reset();
  };

  const close = () => {
    toggleDrawer(false);
  };

  React.useMemo(() => {
    if (activeTab) return;
    if (dialog.show && dialog.type === "fund_vault") {
      setActiveTab("fund_vault");
      queryParams.set("tab", "fund");
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dialog.show, dialog.type, activeTab]);

  const openDrawer = React.useMemo(() => {
    return activeTab === "fund_vault";
  }, [activeTab]);

  const updateForm = (name: keyof typeof formData, value: string) => {
    setErrMsg("");
    setFormdata((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const setAmount = (id: number) => {
    const match = amountList.find((item) => item.id === id);
    if (match) {
      setFormdata((prev) => ({
        ...prev,
        amount: Number(match.amount),
      }));
      setActiveAmount(match.id);
    }
  };

  const proceedToPreview = async () => {
    try {
      validation.pick({ amount: true, funding_source: true }).parse({
        amount: Number(formData.amount),
        funding_source: formData.funding_source,
      });
      setActiveTab("preview");
    } catch (err) {
      const error = ensureError(err);
      toast.error(error.message);
    }
  };

  const proceedToPin = () => {
    setActiveTab("pin");
  };

  const submit = async () => {
    setErrMsg("");
    setIsLoading(true);
    try {
      const formValues = validation.parse({
        ...formData,
        amount: Number(formData.amount),
      });
      await fundVault({ ...formValues, currency: currency.code });
      setActiveTab("success");
    } catch (error) {
      const err = ensureError(error);

      if (err.message.toLocaleLowerCase().includes("insufficient")) {
        return setActiveTab("insufficient_funds");
      }

      toast.error(err.message);
      setErrMsg(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const proceedToFundWallet = () => {
    toggleDrawer(false);
    navigate("/wallet");
    ui.changeDialog({
      show: true,
      type: "fund_wallet",
    });
  };

  return {
    openDrawer,
    activeTab,
    activeAmount,
    sign: currency.sign,
    formData,
    isLoading,
    errMsg,
    updateForm,
    setAmount,
    toggleDrawer,
    proceedToPin,
    proceedToPreview,
    close,
    submit,
    proceedToFundWallet,
  };
}
