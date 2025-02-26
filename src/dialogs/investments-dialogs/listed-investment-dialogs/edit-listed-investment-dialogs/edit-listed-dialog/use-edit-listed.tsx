import useCustomNavigation from "@/hooks/use-navigation";
import { amountSeparator } from "@/lib/amount-separator";
import ensureError from "@/lib/ensure-error";
import getProductDetails from "@/services/investments/get-product-details";
import getMyInvestmentCategoryDetails from "@/services/my-investments/get-my-investment-category-details";
import sellInvestmentUnits from "@/services/my-investments/sell-investment-units";
import useActions from "@/store/actions";
import { useAppSelector } from "@/store/hooks";
import {
  ActiveInvestmentInvestments,
  MyInvestmentMarketplace,
} from "@/types/my-investments.types";
import * as React from "react";
import { useQuery } from "react-query";
import { toast } from "sonner";
import { z } from "zod";


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

export default function useEditListed() {
  const { currency } = useAppSelector((state) => state.account);
  const { dialog } = useAppSelector((state) => state.ui);
  const data = dialog?.data as MyInvestmentMarketplace;

  const init: FormData = {
    product_id: "" as any,
    units: 0,
    sale_option: "ethifunds",
    asking_price: 0,
    pin: "",
  };

  const [formData, setFormData] = React.useState(init);
  const [isLoading, setIsLoading] = React.useState(false);

  const [productList, setProductList] = React.useState<
    (ActiveInvestmentInvestments & { name: string; unit_price: string })[]
  >([]);

  const { queryParams } = useCustomNavigation();
  const { ui } = useActions();

  const categoryId = React.useMemo(
    () => data?.product?.product_category_id?.toString(),
    [data?.product?.product_category_id],
  );

  React.useMemo(() => {
    setFormData({
      product_id: data?.product_id ?? "",
      units: data?.units,
      sale_option: data?.sale_option,
      asking_price: Number(data?.asking_price_per_unit),
      pin: "",
    });
  }, [
    data?.asking_price_per_unit,
    data?.product_id,
    data?.sale_option,
    data?.units,
  ]);

  const { isFetching, isError, error } = useQuery(
    ["listed-investment-category-details", categoryId],
    () => getMyInvestmentCategoryDetails({ categoryId }),
    {
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

  const open = React.useMemo(() => {
    return dialog.show && dialog.type === "edit-investment-listing";
  }, [dialog.show, dialog.type]);

  const reset = () => {
    if (isLoading) return;
    setFormData(init);
    setIsLoading(false);
    queryParams.delete("sale_option");
    queryParams.delete("action");
  };

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

  const showPreview = async (payload: typeof formData) => {
    try {
      const formValues = validation.omit({ pin: true }).parse(payload);

      const data = {
        asking_price: `${currency.sign} ${amountSeparator(formValues.asking_price)}`,
        number_of_units_to_sell: amountSeparator(formValues.units),
        "value_of_the_unit(s)": `${amountSeparator(formValues.asking_price * formValues.units)}`,
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
      if (errMsg.includes("insufficient")) return showInsufficientFund();
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
        "Your listing is live!!. Buyers can now view and purchase your investment.",
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

  console.log("init", init, formData, productDetails);

  return {
    isFetching,
    isError,
    error,
    open,
    formData,
    productDetails,
    isLoading,
    unitCosts,
    currency,
    updateForm,
    toggleDrawer,
    setSaleOption,
    submit,
  };
}
