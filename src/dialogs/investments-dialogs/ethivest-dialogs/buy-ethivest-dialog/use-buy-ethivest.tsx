import useCustomNavigation from "@/hooks/use-navigation";
import { amountSeparator } from "@/lib/amount-separator";
import ensureError from "@/lib/ensure-error";
import buyUnits from "@/services/investments/buy-units";
import getProductDetails from "@/services/investments/get-product-details";
import useActions from "@/store/actions";
import { useAppSelector } from "@/store/hooks";
import { InvestmentProduct } from "@/types/investments.types";
import * as React from "react";
import { useQuery } from "react-query";
import { toast } from "sonner";
import { z } from "zod";

const validation = z.object({
  product_id: z.number(),
  units: z.number(),
  pin: z.string().length(4, "Pin is required"),
});

type FormData = z.infer<typeof validation>;

export type EthivestTabsProps = {
  data: InvestmentProduct;
  changeTab: (value: any) => void;
  formData: FormData;
  isLoading: boolean;
  updateForm: (
    name: keyof FormData,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => void;
  updateUnits: (value: number) => void;
};
const init: FormData = {
  product_id: 0,
  units: 10,
  pin: "",
};

export default function useBuyEthivest() {
  const { currency } = useAppSelector((state) => state.account);
  const { dialog } = useAppSelector((state) => state.ui);
  const [activeTab, setActiveTab] = React.useState<
    "buy_product" | "product_details"
  >("product_details");

  const [formData, setFormData] = React.useState(init);
  const [isLoading, setIsLoading] = React.useState(false);

  const { queryParams } = useCustomNavigation();

  const { ui } = useActions();

  const productId = dialog.id;

  const open = React.useMemo(() => {
    return dialog.show && dialog.type === "buy_ethivest_product";
  }, [dialog.show, dialog.type]);

  const {
    isFetching,
    isError,
    error,
    data: response,
  } = useQuery(
    ["ethivest-product-details-dialog", productId, open],
    () => getProductDetails({ productId: Number(productId) }),
    { enabled: open },
    );
  
  console.log(response)

  const reset = () => {
    if (isLoading) return;
    setFormData(init);
    setActiveTab("product_details");
    queryParams.delete("actions");
  };

  const updateForm = (
    name: keyof typeof formData,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [name]: e.target.value,
    }));
  };

  const updateUnits = (value: number) => {
    setFormData((prev) => ({
      ...prev,
      units: value,
    }));
  };

  const changeTab = (value: typeof activeTab) => {
    setActiveTab(value);
    if (value === "buy_product") {
      queryParams.set("actions", value);
    }
  };

  const toggleDrawer = (value: boolean) => {
    ui.changeDialog({
      show: value,
      type: "",
      id: "",
    });
    reset();
  };

  const goBack = () => {
    changeTab("product_details");
  };

  const invest = () => {
    changeTab("buy_product");
  };

  const proceedToPayment = () => {
    console.log(response);
    if (!response) return;

    if (formData.units > response?.total_units) {
      toast.error("Entered units exceeds the amount of available units");
      return;
    }

    const purchasing_cost = Math.floor(
      Number(response.unit_price) * formData.units,
    );

    const available_units = Math.floor(
      response.total_units - response.units_sold,
    );

    const data = {
      section: response.product_section.name,
      trustee: response?.custodian?.name,
      interest_rate: `${response.expected_roi}% ROI`,
      purchasing_cost: `${currency.sign} ${amountSeparator(purchasing_cost)}`,
      available_units: `${amountSeparator(available_units)} units`,
      current_unit_price: `${currency.sign} ${amountSeparator(response.unit_price)}`,
    };

    ui.changeDialog({
      show: true,
      type: "ethivest_product_preview",
      data,
      action: showPinDialog,
      dismiss: reset,
    });
  };

  const showPinDialog = () => {
    ui.changeDialog({
      show: true,
      type: "enter_pin",
      action: submit,
      dismiss: reset,
    });
  };

  const submit = async (pin: string) => {
    if (!productId) {
      toast.error("No Product details found");
      return;
    }

    setIsLoading(true);
    try {
      const formValues = validation.parse({
        ...formData,
        units: Number(formData.units),
        product_id: Number(productId),
        pin,
      });
      await buyUnits(formValues);
      showSuccess();
    } catch (err) {
      const errMsg = ensureError(err).message;
      if (errMsg.toLocaleLowerCase().includes("insufficient"))
        return showInsufficientDialog();
      toast.error(errMsg);
    } finally {
      setIsLoading(false);
    }
  };

  function showSuccess() {
    const data = {
      title: "Investment Successful! ",
      subtitle:
        "Your funds are now allocated to Real Estate Investment Trust. Track your returns in your portfolio.",
    };

    ui.changeDialog({
      show: true,
      type: "success_dialog",
      action: reset,
      data,
    });
  }

  function showInsufficientDialog() {
    ui.changeDialog({
      show: true,
      type: "insufficient_funds",
      dismiss: reset,
    });
  }

  return {
    isFetching,
    isError,
    error,
    data: response,
    open,
    activeTab,
    isLoading,
    formData,
    changeTab,
    toggleDrawer,
    updateForm,
    updateUnits,
    goBack,
    invest,
    proceedToPayment,
  };
}
