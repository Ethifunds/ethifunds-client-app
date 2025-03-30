import useExtras from "@/hooks/use-extras";
import getWalletBalance from "@/services/wallet/get-wallet-balance";
import useActions from "@/store/actions";
import * as React from "react";
import { useQuery } from "react-query";

export default function useWalletBalance() {
  const { sign, currency, changeCurrency } = useExtras();
  const { ui } = useActions();

  const [balance, setBalance] = React.useState({
    wallet: 0,
    vault: 0,
    investment: 0,
  });

  const fundWallet = () => {
    ui.changeDialog({
      type: "fund_wallet",
      id: "",
      show: true,
    });
  };

  const withdrawal = () => {
    ui.changeDialog({
      type: "withdrawal",
      id: "",
      show: true,
    });
  };

  const query = useQuery(
    ["wallet-balance", currency],
    () => getWalletBalance({ currency }),
    {
      onSuccess(data) {
        setBalance(data);
      },
    },
  );

  return {
    ...query,
    balance,
    currency,
    sign,
    changeCurrency,
    fundWallet,
    withdrawal,
  };
}
