import useExtras from "@/hooks/use-extras";
import useCustomNavigation from "@/hooks/use-navigation";
import getWalletBalance from "@/services/wallet/get-wallet-balance";
import useActions from "@/store/actions";
import { useQuery } from "react-query";
import * as React from "react";

export default function useBalance() {
  const { sign, currency, changeCurrency } = useExtras();
  const [balance, setBalance] = React.useState(0);
  const { ui } = useActions();
  const { queryParams } = useCustomNavigation();

  const hasAction = queryParams.has("action");

  const query = useQuery(
    ["investment-balance", currency],
    () => getWalletBalance({ currency }),
    {
      enabled: !hasAction && true,
      onSuccess(data) {
        setBalance(data.investment);
      },
    },
  );

  const fundWallet = () => {
    ui.changeDialog({
      type: "fund_vault",
      id: "",
      show: true,
    });
  };

  const withdrawal = () => {
    ui.changeDialog({
      type: "vault_withdrawal",
      id: "",
      show: true,
    });
  };

  return {
    ...query,
      currency,
    balance,
    sign,
    changeCurrency,
    fundWallet,
    withdrawal,
  };
}
