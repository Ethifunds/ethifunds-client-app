import * as React from "react";
import { amountSeparator } from "@/lib/amount-separator";
import classNames from "classnames";
import useBalance from "./use-balance";
import ErrorBoundary from "@/components/error-boundary";
import { RefreshCw } from "lucide-react";
import Render from "@/components/render";
import { Skeleton } from "@/components/ui/skeleton";
import AppButton from "@/components/app-button";

type SavingsBalanceProps = {
  showManualFunding: boolean;
  isLoading: boolean;
  makeManualPayment: () => void;
};
export default React.memo(function SavingsBalance(props: SavingsBalanceProps) {
  const { isFetching, isError, error, refetch, sign, balance } = useBalance();

  const container = classNames(
    "border rounded-lg shrink-0 lg:shrink w-full lg:w-[40%] min-h-48 flex flex-col lg:min-h-52 shadow-sm",
    {
      "py-4 px-3 lg:px-6": !isFetching,
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
          <div className="flex h-full grow flex-col gap-6">
            <div className="flex flex-1 justify-between">
              <div className="flex flex-col gap-5">
                <h1 className="content-standard text-neutral-700">
                  Ethicoop Balance
                </h1>
                <h2 className="heading-4 uppercase">
                  {sign} {amountSeparator(balance)}
                </h2>
              </div>

              <div>
                <button onClick={() => refetch()}>
                  <RefreshCw />
                </button>
              </div>
            </div>

            {props.showManualFunding && (
              <div className="flex h-full w-full justify-end">
                <AppButton
                  variant="primary"
                  className="w-full rounded-lg lg:w-40"
                  onClick={props.makeManualPayment}
                  isLoading={props.isLoading}
                >
                  Make Payment
                </AppButton>
              </div>
            )}
          </div>
        </Render>
      </div>
    </ErrorBoundary>
  );
});
