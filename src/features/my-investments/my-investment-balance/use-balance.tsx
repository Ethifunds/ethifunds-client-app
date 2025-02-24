import useExtras from "@/hooks/use-extras";
import getMyInvestmentsBalance from "@/services/my-investments/get-my-investments-balance";
import { useQuery } from "react-query";

export default function useBalance() {
  const { sign, currency, changeCurrency } = useExtras();

  const query = useQuery(["my-investment-balance", currency], () =>
    getMyInvestmentsBalance({ currency }),
  );

  return {
    ...query,
    currency,
    sign,
    changeCurrency,
  };
}
