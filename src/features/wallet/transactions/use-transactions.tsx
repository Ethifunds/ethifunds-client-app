import useCustomNavigation from "@/hooks/use-navigation";
import getTransactions from "@/services/wallet/get-transactions";
import { useAppSelector } from "@/store/hooks";
import { useQuery } from "react-query";
import * as React from "react";

export default function useTransactions() {
  const { currency } = useAppSelector((state) => state.account);
  const { location } = useCustomNavigation();

  const query_string = React.useMemo(() => {
    const search = location.search.trim();
    return search
      ? `${search}&currency=${currency.code}`
      : `?currency=${currency.code}`;
  }, [location.search, currency.code]);

  const query = useQuery(["transactions", currency, query_string], () =>
    getTransactions({ currency: currency.code, query_string }),
  );
  return {
    ...query,
    sign: currency.sign,
  };
}
