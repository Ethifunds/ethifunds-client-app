import useCustomNavigation from "@/hooks/use-navigation";
import { amountSeparator } from "@/lib/amount-separator";
import ensureError from "@/lib/ensure-error";
import getProductDetails from "@/services/investments/get-product-details";
import getMyInvestmentCategoryDetails from "@/services/my-investments/get-my-investment-category-details";
import sellInvestmentUnits from "@/services/my-investments/sell-investment-units";
import useActions from "@/store/actions";
import { useAppSelector } from "@/store/hooks";
import { ActiveInvestmentInvestments } from "@/types/my-investments.types";
import * as React from "react";
import { useQuery } from "react-query";
import { toast } from "sonner";
import { z } from "zod";

const initWarningMsg =
  "Warning message to inform the users of the sales charges";
const askingPriceMsg =
  "Set your asking price: Choose a competitive price per unit to attract buyers and maximize your returns";

const validation = z.object({
  product_id: z
    .number({ message: "product Id must be a number" })
    .positive("Product Id must be valid"),
  units: z
    .number({ message: "units must be a number" })
    .positive("units must be positive"),
  sale_option: z.enum(["marketplace", "ethifunds"], {
    message: "Sale Option must be valid",
  }),
  asking_price: z
    .number({ message: "asking price must be a number" })
    .positive("Asking price must be a positive value"),
  pin: z.string().length(4, "Pin is required"),
});

type FormData = z.infer<typeof validation>;

const init: FormData = {
  product_id: "" as any,
  units: 10,
  sale_option: "" as FormData["sale_option"],
  asking_price: "" as any,
  pin: "",
};

export default function useSellUnits() {
  const { currency } = useAppSelector((state) => state.account);
  const { dialog } = useAppSelector((state) => state.ui);
  const [formData, setFormData] = React.useState(init);
  const [isLoading, setIsLoading] = React.useState(false);
  const [warningMsg, setWarningMsg] = React.useState(initWarningMsg);

  const [showAskPrice, setShowAskPrice] = React.useState(false);

  const [productList, setProductList] = React.useState<
    (ActiveInvestmentInvestments & { name: string; unit_price: string })[]
  >([]);

  const { params, queryParams } = useCustomNavigation();
  const { ui } = useActions();

  const open = React.useMemo(() => {
    return dialog.show && dialog.type === "sell-investment-units";
  }, [dialog.show, dialog.type]);

  const categoryId = params.categoryId ?? "";

  const { isFetching, isError, error } = useQuery(
    ["investment-category-details", categoryId],
    () => getMyInvestmentCategoryDetails({ categoryId }),
    {
      enabled: open,
      onSuccess: async (data) => {
        const getProductList = data.investments.map(async (item) => {
          const res = await getProductDetails({ productId: item.product_id });

          return {
            name: res.name,
            unit_price: res.unit_price,
            ...item,
          };
        });

        const list = await Promise.all(getProductList);

        if (list.length) {
          setProductList(list);
        }
      },
    },
  );



  const reset = () => {
    if (isLoading) return;
    setFormData(init);
    setIsLoading(false);
    setShowAskPrice(false);
    setWarningMsg(initWarningMsg);
    queryParams.delete("sale_option");
  };

  const productOptions = React.useMemo(() => {
    return productList.map((item) => ({
      title: item.name,
      value: item.id.toString(),
    }));
  }, [productList]);

  const productDetails = React.useMemo(() => {
    if (!formData.product_id) return null;
    return (
      productList.find((item) => item.id === Number(formData.product_id)) ??
      null
    );
  }, [formData.product_id, productList]);

  const updateForm = (
    name: keyof typeof formData,
    e: React.ChangeEvent<HTMLInputElement> | string,
  ) => {
    const numTypeNames: (typeof name)[] = [
      "product_id",
      "units",
      "asking_price",
    ];
    const value = typeof e === "string" ? e : e.target.value;
    setFormData((prev) => ({
      ...prev,
      [name]: numTypeNames.includes(name) ? Number(value) : value,
    }));

    if (name === "product_id") {
      setFormData({
        [name]: Number(value),
        units: 1,
        sale_option: "" as FormData["sale_option"],
        asking_price: 0,
        pin: "",
      });
    }
  };

  const unitCosts = React.useMemo(
    () => Number(productDetails?.unit_price) * formData.units,
    [formData.units, productDetails?.unit_price],
  );

  const setSaleOption = (option: typeof formData.sale_option) => {
    queryParams.set("sale_option", option);
  };

  const toggleDrawer = (value: boolean) => {
    ui.changeDialog({
      show: value,
      type: "",
      id: "",
    });
    reset();
  };

  const toggleAskPrice = (value: boolean) => {
    if (value) {
      setWarningMsg(askingPriceMsg);
    } else {
      setWarningMsg(initWarningMsg);
      setFormData((prev) => ({
        ...prev,
        asking_price: unitCosts,
      }));
    }
    setShowAskPrice(value);
  };

  const showPreview = async (payload: typeof formData) => {
    if(!productDetails) return
    try {

      const formValues = validation.omit({ pin: true }).parse(payload);
      if (formData.units > productDetails?.units_purchased) {
        throw new Error("Entered units exceeds the amount of purchased units");
    }

      const data = {
        asking_price: `${currency.sign} ${amountSeparator(formValues.asking_price)}`,
        number_of_units_to_sell: amountSeparator(formValues.units),
        value_of_the_units: `${amountSeparator(formValues.asking_price * formValues.units)}`,
        sale_option: formValues.sale_option,
      };

      ui.changeDialog({
        show: true,
        type: "sell-investment-preview",
        data,
        action: () => {
          showPinDialog();
        },
        dismiss: reset,
      });
    } catch (error) {
      const errMsg = ensureError(error).message;

      toast.error(errMsg);
    }
  };

  const submit = async (pin: string) => {
    setIsLoading(true);

    const asking_price = Number(
      formData.asking_price ? formData.asking_price : unitCosts,
    );

    const saleOption = queryParams.get("sale_option") ?? "";

    const payload = {
      ...formData,
      product_id: Number(formData.product_id),
      pin,
      asking_price,
      sale_option: saleOption as typeof formData.sale_option,
    };

    
    if (!pin) {
      return showPreview(payload);
    }

    try {
      const formValues = validation.parse(payload);

      await sellInvestmentUnits(formValues);

      showSuccess();
    } catch (error) {
      const errMsg = ensureError(error).message;
      if (errMsg.toLocaleLowerCase().includes("insufficient"))
        return showInsufficientFund();
      toast.error(errMsg);
    } finally {
      setIsLoading(true);
    }
  };

  const showPinDialog = () => {
    ui.changeDialog({
      show: true,
      type: "enter_pin",
      action: submit,
      dismiss: reset,
    });
  };

  const showSuccess = () => {
    const data = {
      title: "Congratulations!!!",
      subtitle:
        "You’ve successfully sold your REIT units to Ethifunds. If a counteroffer is made, you’ll be notified to review and accept or decline.",
    };
    ui.changeDialog({
      show: true,
      type: "success_dialog",
      data,
      action: reset,
    });
  };

  const showInsufficientFund = () => {
    ui.changeDialog({
      show: true,
      type: "insufficient_funds",
    });
  };

  return {
    isFetching,
    isError,
    error,
    open,
    warningMsg,
    isLoading,
    productList,
    showAskPrice,
    formData,
    productDetails,
    productOptions,
    currency,
    unitCosts,
    setSaleOption,
    updateForm,
    toggleAskPrice,
    showPreview,
    submit,
    toggleDrawer,
  };
}
