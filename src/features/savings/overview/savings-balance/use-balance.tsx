import getSavingsBalance from "@/services/savings/get-savings-balance";
import { useAppSelector } from "@/store/hooks";
import * as React from "react";

import { useQuery } from "react-query";

export default function useBalance() {
  const { currency } = useAppSelector((state) => state.account);
  const [balance, setBalance] = React.useState(0);

  const query = useQuery(["ethicoop-balance"], () => getSavingsBalance(), {
    onSuccess(data) {
      if (data) {
        setBalance(data);
      }
    },
  });

  return {
    ...query,
    balance,
    sign: currency?.sign,
  };
}
