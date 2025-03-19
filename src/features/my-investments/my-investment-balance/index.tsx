import * as React from "react";
import CurrencyPicker from "@/components/currency-picker";
import { amountSeparator } from "@/lib/amount-separator";
import classNames from "classnames";
import useBalance from "./use-balance";
import ErrorBoundary from "@/components/error-boundary";
import Render from "@/components/render";
import { Skeleton } from "@/components/ui/skeleton";

export default React.memo(function MyInvestmentBalance() {
  const { isFetching, isError, error, data, currency, sign, changeCurrency } =
    useBalance();

  const container = classNames(
    "border rounded-lg shrink-0 lg:shrink w-full lg:w-1/2 min-h-48 lg:min-h-52",
    {
      "py-8 px-6": !isFetching
    },
  );
  return (
    <ErrorBoundary>
      <div className={container}>
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
                <h2 className="heading-4 uppercase">
                  {sign} {amountSeparator(data ?? "")}
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
    </ErrorBoundary>
  );
});
