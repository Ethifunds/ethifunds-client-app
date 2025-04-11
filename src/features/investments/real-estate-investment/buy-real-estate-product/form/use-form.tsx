import useCustomNavigation from "@/hooks/use-navigation";
import ensureError from "@/lib/ensure-error";
import buyRealEstateProduct from "@/services/investments/real-estate/buy-real-estate-product";
import useActions from "@/store/actions";
import * as React from "react";
import { toast } from "sonner";
import { z } from "zod";

export type FormProps = {
  unit_price: string;
  available_units: number;
};
type refresh = () => void;

const validation = z.object({
  units: z.number().positive("units must be a positive number"),
  pin: z.string().trim().length(4, "pin is required"),
  product_id: z.number().positive("product id is required"),
});

type FormData = z.infer<typeof validation>;

export default function useForm(data: FormProps & { refresh: refresh }) {
  const { params } = useCustomNavigation();
  const productId = Number(params.productId);
  const init: FormData = {
    units: 10,
    pin: "",
    product_id: productId,
  };
  const [formData, setFormData] = React.useState(init);
  const [isLoading, setIsLoading] = React.useState(false);
  const [availableUnits, setAvailableUnits] = React.useState(
    data.available_units,
  );

  const { ui } = useActions();

  const reset = () => {
    data.refresh();
    setFormData(init);
  };

  const updateForm = (
    name: keyof typeof formData,
    e: React.ChangeEvent<HTMLInputElement> | string,
  ) => {
    if (typeof e === "string") {
      return setFormData((prev) => ({
        ...prev,
        [name]: e,
      }));
    }

    setFormData((prev) => ({
      ...prev,
      [name]: e.target.value,
    }));
  };

  const setUnits = (units: number) => {
    setFormData((prev) => ({
      ...prev,
      units: units,
    }));
  };

  const purchaseAmount = React.useMemo(() => {
    return Math.floor(formData.units * Number(data.unit_price));
  }, [formData.units, data.unit_price]);

  const proceed = () => {
    if (formData.units > data.available_units) {
      toast.error("Entered units exceeds the amount of available units");
      return;
    }
    ui.changeDialog({
      show: true,
      type: "enter_pin",
      action: submit,
    });
  };

  const showSuccessDialog = () => {
    ui.changeDialog({
      show: true,
      type: "real-estate-purchase-success",
      action: reset,
    });
  };

  const showInsufficientFundsDialog = () => {
    ui.changeDialog({
      show: true,
      type: "insufficient_funds",
    });
  };

  const updateAvailableUnits = () => {
    setAvailableUnits((prev) => prev - formData.units);
  };

  async function submit(pin: string) {
    setIsLoading(true);
    try {
      const fromValues = validation.parse({
        ...formData,
        units: Number(formData.units),
        pin,
      });
      await buyRealEstateProduct(fromValues);
      showSuccessDialog();
      updateAvailableUnits();
    } catch (error) {
      const errMsg = ensureError(error).message;
      const err = ensureError(error);
      if (err.message.toLowerCase().includes("insufficient")) {
        return showInsufficientFundsDialog();
      }
      toast.error(errMsg);
    } finally {
      setIsLoading(false);
    }
  }

  return {
    isLoading,
    formData,
    purchaseAmount,
    availableUnits,
    setUnits,
    proceed,
    updateForm,
  };
}
