import getSavingsRecentTransactions from "@/services/savings/get-recent-transactions";
import { useAppSelector } from "@/store/hooks";
import { useQuery } from "react-query";

export default function useRecentTransactions(cycle_id: number) {
  const { currency } = useAppSelector((state) => state.account);
  const query = useQuery(["recent-savings-transactions", cycle_id], () =>
    getSavingsRecentTransactions({ cycle_id }),
  );
  return {
    ...query,
    sign: currency.sign,
  };
}
