import useCustomNavigation from "@/hooks/use-navigation";
import getSavingsTransactions from "@/services/savings/get-transactions";
import { useAppSelector } from "@/store/hooks";
import { useQuery } from "react-query";

export default function useTransactions() {
  const { currency } = useAppSelector((state) => state.account);
  const { params } = useCustomNavigation();

  const cycle_id = params.cycle_id ?? "";

  const query = useQuery(["transactions"], () =>
    getSavingsTransactions({ cycle_id }),
  );
  return {
    ...query,
    sign: currency.sign,
  };
}
