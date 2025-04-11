import * as React from "react";
import CurrencyPicker from "@/components/currency-picker";
import { amountSeparator } from "@/lib/amount-separator";
import classNames from "classnames";
import useBalance from "./use-balance";
import { InvestmentVault } from "@/types/investment-vault.types";
import ErrorBoundary from "@/components/error-boundary";
import Render from "@/components/render";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "react-query";

type AvailableBalanceProps = InvestmentVault &
  Pick<ReturnType<typeof useQuery>, "isFetching" | "isError" | "error"> & {};
export default React.memo(function AvailableBalance(
  props: AvailableBalanceProps,
) {
  const { currency, sign, changeCurrency, fundWallet, withdrawal } =
    useBalance();

  const container = classNames(
    "border rounded-lg shrink-0 lg:shrink w-full lg:w-1/2 min-h-48 lg:min-h-52",
    {
      "py-8 px-6 ": !props.isFetching,
    },
  );
  return (
    <ErrorBoundary>
      <div className={container}>
        <Render
          isLoading={props.isFetching}
          isError={props.isError}
          error={props.error}
          loadingComponent={<Skeleton className="h-48 lg:h-52" />}
        >
          <div className="flex flex-col gap-6">
            <div className="flex justify-between">
              <div className="flex flex-col gap-5">
                <h1 className="content-standard text-neutral-700">
                  Available Balance
                </h1>
                <h2 className="heading-4 uppercase">
                  {sign} {amountSeparator(props?.withdrawable_balance)}
                </h2>
              </div>

              <div>
                <CurrencyPicker
                  currency={currency}
                  setCurrency={changeCurrency}
                />
              </div>
            </div>
            <div className="flex grow justify-end gap-5">
              <button
                onClick={fundWallet}
                className="button-primary !rounded-lg !py-2 text-white lg:w-1/3"
              >
                Fund Vault
              </button>

              <button
                onClick={withdrawal}
                className="button-outline !rounded-lg !border-primary !py-2 text-primary lg:w-1/3"
              >
                Withdraw
              </button>
            </div>
          </div>
        </Render>
      </div>
    </ErrorBoundary>
  );
});
