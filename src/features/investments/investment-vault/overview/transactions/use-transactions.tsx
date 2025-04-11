import useCustomNavigation from "@/hooks/use-navigation";
import getVaultTransactions from "@/services/investments/vault/get-vault-transactions";
import { useAppSelector } from "@/store/hooks";
import { useQuery } from "react-query";
import * as React from "react";
import { formatSearchString } from "@/lib/build-query-string";

export default function useTransactions() {
  const { currency } = useAppSelector((state) => state.account);
  const { location } = useCustomNavigation();

  const query_string = React.useMemo(() => {
    const search = location.search.trim();
    return formatSearchString(search, { currency: currency.code });
  }, [location.search, currency.code]);

  const query = useQuery(["vault-transactions", currency, query_string], () =>
    getVaultTransactions({ query_string }),
  );
  return {
    ...query,
    sign: currency.sign,
  };
}
