import ensureError from "@/lib/ensure-error";
import buyMarketplaceProduct from "@/services/investments/buy-marketplace-product";
import useActions from "@/store/actions";
import { useAppSelector } from "@/store/hooks";
import { investmentMarketplaceProduct } from "@/types/investments.types";
import * as React from "react";
import { toast } from "sonner";
import { z } from "zod";

const validation = z.object({
  product_id: z.number().positive("product Id must be valid"),
  units: z.number().positive("units is required"),
  pin: z.string().trim().length(4, "pin is required"),
  counter_price_per_unit: z.string().min(1, "counter price unit is required"),
});

type FormData = z.infer<typeof validation>;

export default function useForm(data: investmentMarketplaceProduct) {
  const { currency } = useAppSelector((state) => state.account);

  const init: FormData = {
    product_id: data.product_id,
    units: 1,
    pin: "",
    counter_price_per_unit: "",
  };

  const [formData, setFormData] = React.useState(init);
  const [isLoading, setIsLoading] = React.useState(false);

  const { ui } = useActions();

  const reset = () => {
    if (isLoading) return;
    setFormData(init);
    ui.changeDialog({
      id: "",
      show: false,
      type: "",
      action: null,
    });
  };

  const updateForm = (
    name: keyof typeof formData,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setFormData((prev) => {
      return {
        ...prev,
        [name]: e.target.value,
      };
    });
  };

  const enterPinDialog = () => {
    ui.changeDialog({
      show: true,
      type: "enter_pin",
      action: submit,
    });
  };
  const counter_price_per_unit = React.useMemo(() => {
    const counter_price =
      String(formData.counter_price_per_unit).length > 0
        ? formData.counter_price_per_unit
        : data.asking_price_per_unit;
    return counter_price;
  }, [data.asking_price_per_unit, formData.counter_price_per_unit]);

  const showPreview = () => {
    const payload = {
      seller_username: data.seller_investment_info.user.username,
      interest_rate: `${data.product.expected_roi}%`,
      counter_offer_price: counter_price_per_unit,
      purchasing_cost: formData.units * Number(counter_price_per_unit),
      purchasing_unit: `${formData.units} ${formData.units > 1 ? "units" : "unit"} `,
    };
    ui.changeDialog({
      show: true,
      type: "real-estate-marketplace-purchase-preview",
      action: enterPinDialog,
      data: payload,
      dismiss: reset,
    });
  };

  const submit = async (pin: string) => {
    setIsLoading(true);

    try {
      const formValues = validation.parse({
        ...formData,
        counter_price_per_unit,
        pin,
      });
      await buyMarketplaceProduct(formValues);
      showSuccessDialog();
    } catch (err) {
      const errMsg = ensureError(err).message;
      if (errMsg.includes("insufficient")) return showInsufficientDialog();
      toast.error(errMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const showSuccessDialog = () => {
    ui.changeDialog({
      show: true,
      type: "real-estate-marketplace-purchase-success",
      action: reset,
    });
  };

  const showInsufficientDialog = () => {
    ui.changeDialog({
      show: true,
      type: "insufficient_funds",
      action: reset,
    });
  };

  // React.useMemo(() => {
  //   if (formData.counter_price_per_unit.length > 0) return;

  //   setFormData((prev) => ({
  //     ...prev,
  //     counter_price_per_unit: String(
  //       Number(data.asking_price_per_unit) * formData.units,
  //     ),
  //   }));
  // }, [
  //   data.asking_price_per_unit,
  //   formData.counter_price_per_unit,
  //   formData.units,
  // ]);
  return {
    currency,
    formData,
    reset,
    updateForm,
    showPreview,
  };
}
