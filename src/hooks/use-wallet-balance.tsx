import getWalletBalance from "@/services/wallet/get-wallet-balance";
import { useAppSelector } from "@/store/hooks";
import { useQuery } from "react-query";

export default function useWalletBalance() {
  const { currency } = useAppSelector((state) => state.account);

  const { isFetching, isError, error, data, refetch } = useQuery(
    ["wallet-balance", currency.code],
    () => getWalletBalance({ currency: currency.code }),
  );

  return {
    isFetching,
    isError,
    error,
    currency,
    wallet: data?.wallet ?? 0,
    vault: data?.vault ?? 0,
    investment: data?.investment ?? 0,
    refreshBalance:refetch,
  };
}
