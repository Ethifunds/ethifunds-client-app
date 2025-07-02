import * as React from "react";
import useWalletBalance from "./use-wallet-balance";
import Render from "@/components/render";
import CurrencyPicker from "@/components/currency-picker";
import { amountSeparator } from "@/lib/amount-separator";
import classNames from "classnames";
import ErrorBoundary from "@/components/error-boundary";
import { Skeleton } from "@/components/ui/skeleton";
import { TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

export default React.memo(function WalletBalance() {
  const {
    isFetching,
    isError,
    error,
    balance,
    currency,
    sign,
    changeCurrency,
    fundWallet,
    withdrawal,
  } = useWalletBalance();

  const container = classNames(
    "border rounded-lg shrink-0 lg:shrink w-[85%] lg:w-1/2 min-h-48 lg:min-h-52",
    {
      "py-8 px-6 ": !isFetching,
    },
  );
  return (
    <div className="flex overflow-auto gap-5 py-3 lg:max-w-5xl lg:gap-10 lg:overflow-hidden lg:py-0">
      <div className={container}>
        <ErrorBoundary>
          <Render
            isLoading={isFetching}
            isError={isError}
            error={error}
            loadingComponent={<Skeleton className="h-48 lg:h-52" />}
          >
            <div className="flex flex-col gap-6">
              <div className="flex justify-between">
                <div className="flex flex-col gap-5">
                  <h1 className="content-standard text-neutral-700">
                    Wallet Balance
                  </h1>
                  <h2 className="uppercase heading-4">
                    {sign} {amountSeparator(balance.wallet)}
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
                  Fund Wallet
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
        </ErrorBoundary>
      </div>

      <div className={container}>
        <ErrorBoundary>
          <Render
            isLoading={isFetching}
            isError={isError}
            error={error}
            loadingComponent={<Skeleton className="h-48 lg:h-52" />}
          >
            <div className="flex flex-col gap-6">
              <div className="flex justify-between">
                <div className="flex flex-col gap-5">
                  <h1 className="content-standard text-neutral-700">
                    Investment Balance
                  </h1>
                  <h2 className="uppercase heading-4">
                    {sign} {amountSeparator(balance.investment)}
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
                <Link
                  to="/investments"
                  className="flex gap-3 justify-between items-center py-2 w-28 text-white rounded-lg button-primary"
                >
                  <TrendingUp /> Invest
                </Link>
              </div>
            </div>
          </Render>
        </ErrorBoundary>
      </div>
    </div>
  );
});
