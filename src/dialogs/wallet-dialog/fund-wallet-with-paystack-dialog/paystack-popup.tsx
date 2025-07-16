import * as React from "react";
import PaystackPop from "@paystack/inline-js";
import { variables } from "@/constants";
import { toast } from "sonner";
import useAppSelectors from "@/store/use-app-selectors";
import { queryClient } from "@/config/query-client-config";

type PaystackPopupProps = {
  close: () => void;
  amount: number;
};

export default React.memo(function PaystackPopup(props: PaystackPopupProps) {
  const { account } = useAppSelectors("account");
  // const { queryParams } = useCustomNavigation();
  // const initiate = React.useMemo(
  //   () => queryParams.has("action", "add_card_popup"),
  //   [queryParams],
  // );

  const paystackInstance = new PaystackPop();
  const onSuccess = React.useCallback(() => {
    toast.success("Wallet Funding successful!");
    queryClient.invalidateQueries({ queryKey: ["wallet-balance"] });
    props.close();
  }, []);

  const onCancel = React.useCallback(() => {
    props.close();
    toast.info("Transaction session Ended");
  }, []);

  const onError = React.useCallback((params: { message: string }) => {
    toast.error(params.message);
  }, []);

  // if (!initiate) return;

  paystackInstance.newTransaction({
    key: variables.PAYSTACK.public_key,
    email: account.email,
    firstName: account.user_profile?.first_name,
    lastName: account.user_profile?.last_name,
    amount: props.amount * 100,
    metadata: {
      email: account.email,
    },
    onSuccess,
    onCancel,
    onError,
  });

  return <></>;
});
