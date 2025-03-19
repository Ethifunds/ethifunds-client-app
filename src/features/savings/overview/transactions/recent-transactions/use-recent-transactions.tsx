import getRecentTransactions from "@/services/wallet/get-recent-transactions";
import { useAppSelector } from "@/store/hooks";
import { useQuery } from "react-query";

export default function useRecentTransactions() {
  const { currency } = useAppSelector((state) => state.account);
  // TODO: work on the Savings transactions
  const query = useQuery(["recent-savings-transactions", currency], () =>
    getRecentTransactions({ currency: currency.code }),
  );
  return {
    ...query,
    sign: currency.sign,
  };
}
