import * as React from "react";
import PaystackPop from "@paystack/inline-js";
import { variables } from "@/constants";
import { toast } from "sonner";
import useCustomNavigation from "@/hooks/use-navigation";

type AddNewCardProps = {
  close: () => void;
};

export default React.memo(function AddNewCard(props: AddNewCardProps) {
  const { queryParams } = useCustomNavigation();
  const initiate = React.useMemo(
    () => queryParams.has("action", "add_card_popup"),
    [queryParams],
  );

  const paystackInstance = new PaystackPop();
  const onSuccess = React.useCallback(() => {
    toast.success("Card Saved Successfully!");
    props.close();
  }, []);

  const onCancel = React.useCallback(() => {
    props.close();
    toast.info("Transaction session Ended");
  }, []);

  const onError = React.useCallback((params: { message: string }) => {
    toast.error(params.message);
  }, []);

  if (!initiate) return;

  paystackInstance.newTransaction({
    key: variables.PAYSTACK.public_key,
    email: "demo@paystack.com",
    firstName: "jon",
    lastName: "doe",
    amount: variables.PAYSTACK.charge_amount,
    onSuccess,
    onCancel,
    onError,
  });

  return <></>;
});
