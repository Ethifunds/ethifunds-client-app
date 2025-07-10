import useCustomNavigation from "@/hooks/use-navigation";
import useActions from "@/store/actions";
import getSavingsBalance from "@/services/savings/get-savings-balance";
import { useAppSelector } from "@/store/hooks";
import * as React from "react";

import { useQuery } from "react-query";

export default function useBalance() {
  const { currency } = useAppSelector((state) => state.account);
  const [balance, setBalance] = React.useState(0);
    const { queryParams } = useCustomNavigation();
    const { ui } = useActions();
  const query = useQuery(["ethicoop-balance"], () => getSavingsBalance(), {
    onSuccess(data) {
      if (data) {
        setBalance(data);
      }
    },
  });

   const openPreferenceDialog = () => {
     queryParams.set("action", "savings_preference");
     ui.changeDialog({
       show: true,
       type: "savings_preference",
      //  data: savings,
     });
   };

  const fundWalletDialog = () => {
    ui.changeDialog({
      show: true,
      type: "fund_savings",
    });
  };


    const initiateWithdrawalDialog = () => {
      ui.changeDialog({
        show: true,
        type: "savings_withdrawal",
      });
    };
  return {
    ...query,
    balance,
    sign: currency?.sign,
    openPreferenceDialog,
    fundWalletDialog,
    initiateWithdrawalDialog,
  };
}
