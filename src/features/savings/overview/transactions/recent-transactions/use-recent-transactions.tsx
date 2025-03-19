import getSavingsRecentTransactions from "@/services/savings/get-recent-transactions";
import { useAppSelector } from "@/store/hooks";
import { useQuery } from "react-query";

export default function useRecentTransactions() {
  const { currency } = useAppSelector((state) => state.account);
  const query = useQuery(["recent-savings-transactions", currency], () =>
    getSavingsRecentTransactions({ currency: currency.code }),
  );
  return {
    ...query,
    sign: currency.sign,
  };
}
