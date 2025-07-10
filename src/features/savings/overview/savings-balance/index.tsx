import * as React from "react";
import { amountSeparator } from "@/lib/amount-separator";
import classNames from "classnames";
import useBalance from "./use-balance";
import ErrorBoundary from "@/components/error-boundary";
import { RefreshCw } from "lucide-react";
import Render from "@/components/render";
import { Skeleton } from "@/components/ui/skeleton";
import AppButton from "@/components/app-button";
import { assets } from "@/constants";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default React.memo(function SavingsBalance() {
  const {
    isFetching,
    isError,
    error,
    refetch,
    sign,
    balance,
    openPreferenceDialog,
    fundWalletDialog,
    initiateWithdrawalDialog,
  } = useBalance();

  const container = classNames(
    "border rounded-lg shrink-0 lg:shrink w-full lg:w-[60%] min-h-48 flex flex-col lg:min-h-52 shadow-sm",
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
          <div className="flex flex-col gap-6 h-full grow">
            <div className="flex flex-1 justify-between">
              <div className="flex flex-col gap-5">
                <div className="flex gap-2 items-center content-standard text-neutral-700">
                  <h1 className="text-nowrap"> Ethicoop Balance </h1>
                  <button onClick={() => refetch()}>
                    <RefreshCw className="w-5 h-5" />
                  </button>
                </div>
                <h2 className="uppercase heading-4">
                  {sign} {amountSeparator(balance)}
                </h2>
              </div>

              <div className="flex justify-end w-full h-full">
                <DropdownMenu modal={false}>
                  <DropdownMenuTrigger className="!outline-non">
                    <img
                      src={assets.option_icon_01}
                      alt=""
                      className="rotate-90"
                    />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent  className="p-2">
                    <DropdownMenuItem>
                      <AppButton
                        onClick={openPreferenceDialog}
                        variant="ghost"
                        className="p-1"
                      >
                        Set Auto-Funding
                      </AppButton>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <AppButton
                        onClick={initiateWithdrawalDialog}
                        variant="ghost"
                        className="p-1"
                      >
                        Initiate Withdrawal
                      </AppButton>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            <div className="flex justify-end w-full h-full">
              <AppButton
                variant="primary"
                className="w-full rounded-lg lg:w-40"
                onClick={fundWalletDialog}
                // isLoading={props.isLoading}
              >
                Fund Wallet
              </AppButton>
            </div>
          </div>
        </Render>
      </div>
    </ErrorBoundary>
  );
});
