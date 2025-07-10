import * as React from "react";
import CurrencyPicker from "@/components/currency-picker";
import { amountSeparator } from "@/lib/amount-separator";
import classNames from "classnames";
import useBalance from "./use-balance";
import ErrorBoundary from "@/components/error-boundary";
import Render from "@/components/render";
import { Skeleton } from "@/components/ui/skeleton";

export default React.memo(function MyInvestmentBalance() {
  const {
    vaultQuery,
    investmentBalanceQuery,
    currency,
    sign,
    changeCurrency,
    fundWallet,
    withdrawal,
  } = useBalance();

  const vaultContainer = classNames(
    "border rounded-lg shrink-0 lg:shrink w-full lg:w-1/2 min-h-48 lg:min-h-52",
    {
      "py-8 px-6": !vaultQuery.isFetching,
    },
  );

  const investmentContainer = classNames(
    "border rounded-lg shrink-0 lg:shrink w-full lg:w-1/2 min-h-48 lg:min-h-52",
    {
      "py-8 px-6": !investmentBalanceQuery.isFetching,
    },
  );
  return (
    <ErrorBoundary>
      <div className="flex gap-5">
        <div className={investmentContainer}>
          <Render
            isLoading={investmentBalanceQuery.isFetching}
            isError={investmentBalanceQuery.isError}
            error={investmentBalanceQuery.error}
            loadingComponent={<Skeleton className="h-48 lg:h-52" />}
          >
            <div className="flex flex-col gap-6">
              <div className="flex justify-between">
                <div className="flex flex-col gap-5">
                  <h1 className="content-standard text-neutral-700">
                    Investment Balance
                  </h1>
                  <h2 className="uppercase heading-4">
                    {sign} {amountSeparator(investmentBalanceQuery.data ?? "")}
                  </h2>
                </div>

                <div>
                  <CurrencyPicker
                    currency={currency}
                    setCurrency={changeCurrency}
                  />
                </div>
              </div>
            </div>
          </Render>
        </div>
        <div className={vaultContainer}>
          <Render
            isLoading={vaultQuery.isFetching}
            isError={vaultQuery.isError}
            error={vaultQuery.error}
            loadingComponent={<Skeleton className="h-48 lg:h-52" />}
          >
            <div className="flex flex-col gap-6">
              <div className="flex justify-between">
                <div className="flex flex-col gap-5">
                  <h1 className="content-standard text-neutral-700">
                    Available Vault Balance
                  </h1>
                  <h2 className="uppercase heading-4">
                    {sign}{" "}
                    {amountSeparator(
                      vaultQuery.data?.vault?.available_balance ?? "",
                    )}
                  </h2>
                </div>

                <div>
                  <CurrencyPicker
                    currency={currency}
                    setCurrency={changeCurrency}
                  />
                </div>
              </div>
              <div className="flex gap-5 justify-end grow">
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
      </div>
    </ErrorBoundary>
  );
});
