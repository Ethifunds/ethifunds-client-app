import useCustomNavigation from "@/hooks/use-navigation";
import { formatSearchString } from "@/lib/build-query-string";
import getMyInvestmentCategoryTransactions from "@/services/my-investments/get-transactions";
import { useAppSelector } from "@/store/hooks";
import * as React from "react";
import { useQuery } from "react-query";

export default function useTransactions() {
  const { currency } = useAppSelector((state) => state.account);
  const { location, params } = useCustomNavigation();
  const category_id = React.useMemo(() => {
    return params.categoryId ?? "";
  }, [params.categoryId]);

  const query_string = React.useMemo(
    () =>
      formatSearchString(location.search, {
        currency: currency.code,
      }),
    [currency.code, location.search],
  );

  const query = useQuery(["transactions", currency], () =>
    getMyInvestmentCategoryTransactions({ category_id, query_string }),
  );
  return {
    ...query,
    sign: currency.sign,
  };
}
