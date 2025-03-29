import useCustomNavigation from "@/hooks/use-navigation";
import { amountSeparator } from "@/lib/amount-separator";
import ensureError from "@/lib/ensure-error";
import editListedInvestment from "@/services/my-investments/edit-listed-investment";
import getMyActiveInvestments from "@/services/my-investments/get-my-active-investments";
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
  asking_price_per_unit: z
    .number({ message: "asking price must be a number" })
    .positive("Asking price must be a positive value"),
  pin: z.string().length(4, "Pin is required"),
});

type FormData = z.infer<typeof validation>;

export default function useEditListed() {
  const { currency } = useAppSelector((state) => state.account);
  const { dialog } = useAppSelector((state) => state.ui);

  const listedProductDetails = dialog?.data as MyInvestmentMarketplace;

  const init: FormData = {
    product_id: "" as any,
    units: 0,
    asking_price_per_unit: 0,
    pin: "",
  };

  const [formData, setFormData] = React.useState(init);
  const [isLoading, setIsLoading] = React.useState(false);
  const [activeInvestmentDetails, setActiveInvestmentDetails] =
    React.useState<ActiveInvestmentInvestments | null>(null);

  const { queryParams } = useCustomNavigation();
  const { ui } = useActions();

    const open = React.useMemo(() => {
      return dialog.show && dialog.type === "edit-investment-listing";
    }, [dialog.show, dialog.type]);

    React.useEffect(() => {
      if (!open) return;
      setFormData({
        product_id: listedProductDetails?.product_id ?? "",
        units: listedProductDetails?.units,
        asking_price_per_unit: Number(
          listedProductDetails?.asking_price_per_unit,
        ),
        pin: "",
      });
    }, [
      open,
      listedProductDetails?.asking_price_per_unit,
      listedProductDetails?.product_id,
      listedProductDetails?.units,
    ]);

    // making a call to get product details.
    const { isFetching, isError, error } = useQuery(
      [
        "active-investment-category-details",
        listedProductDetails?.product_id,
        open,
      ],
      () => getMyActiveInvestments({ currency: currency.code }),
      {
        enabled: open,
        onSuccess: async (response) => {
          const match = response.find(
            (item) =>
              item.category.id ===
              listedProductDetails?.product?.product_category_id,
          );

          if (match) {
            const product = match.investments.find(
              (item) => item.product_id === listedProductDetails?.product_id,
            );

            if (product) {
              setActiveInvestmentDetails(product);
            }
          }
        },
      },
    );

  const reset = () => {
    if (isLoading) return;
    setFormData(init);
    setIsLoading(false);
    queryParams.delete("sale_option");
    queryParams.delete("action");
  };



  const updateForm = (
    name: keyof typeof formData,
    e: React.ChangeEvent<HTMLInputElement> | string,
  ) => {
    const numTypeNames: (typeof name)[] = [
      "product_id",
      "units",
      "asking_price_per_unit",
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
        asking_price_per_unit: 0,
        pin: "",
      });
    }
  };


  const toggleDrawer = (value: boolean) => {
    ui.changeDialog({
      show: value,
      type: "",
      id: "",
      data: null,
    });
    reset();
  };

  const showPreview = async (payload: typeof formData) => {
    try {
      const formValues = validation.omit({ pin: true }).parse(payload);

      const data = {
        asking_price: `${currency.sign} ${amountSeparator(formValues.asking_price_per_unit)}`,
        number_of_units_to_sell: amountSeparator(formValues.units),
        value_of_the_units: `${amountSeparator(formValues.asking_price_per_unit * formValues.units)}`,
        sale_option: dialog?.data?.sale_option,
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
    if (!dialog.id || !activeInvestmentDetails) {
      toast.error("listing Id is required");
      return;
    }

    if (formData.units > activeInvestmentDetails?.units_purchased) {
      toast.error("Entered units exceeds the amount of purchased units");
      return;
    }

    
    setIsLoading(true);


    const asking_price = Number(
      formData.asking_price_per_unit
        ? formData.asking_price_per_unit
        : listedProductDetails.product.unit_price,
    );

    const payload = {
      ...formData,
      product_id: Number(formData.product_id),
      pin,
      asking_price,
    };

    if (!pin) {
      return showPreview(payload);
    }

    try {
      const formValues = validation.parse(payload);

      await editListedInvestment({
        ...formValues,
        listingId: Number(dialog.id),
      });

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
      dismiss: reset,
    });
  };

  const showInsufficientFund = () => {
    ui.changeDialog({
      show: true,
      type: "insufficient_funds",
    });
  };

  return {
    open,
    isFetching,
    isError,
    error,
    formData,
    activeInvestmentDetails,
    listedProductDetails,
    isLoading,
    currency,
    reset,
    updateForm,
    toggleDrawer,
    submit,
  };
}
