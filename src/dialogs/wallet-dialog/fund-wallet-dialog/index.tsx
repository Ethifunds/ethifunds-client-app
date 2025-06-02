import AppButton from "@/components/app-button";
import Render from "@/components/render";
import AppDrawer from "@/components/ui/app-drawer";
import * as React from "react";
import AccountCard from "./account-card";
import useFundWallet from "./use-fund-wallet";
import FundingReceiptDialog from "./funding-receipt.dialog";
import ErrorBoundary from "@/components/error-boundary";
import EmptyData from "@/components/empty-data";
import { PlusIcon } from "lucide-react";

export default React.memo(function FundWalletDialog() {
  const {
    isFetching,
    isError,
    error,
    data,
    open,
    copied,
    copiedRef,
    confirming,
    copy,
    toggleShow,
    bankAccounts,
    confirm,
    addBankAccount,
  } = useFundWallet();

  return (
    <React.Fragment>
      <ErrorBoundary>
        <AppDrawer
          title="Fund Wallet"
          open={open}
          direction="right"
          handleChange={toggleShow}
          className=""
        >
          <div className="hide-scrollbar h-screen overflow-auto pt-10">
            <h1 className="content-standard px-3 text-neutral-500">
              Kindly fund your wallet by making a transfer to any of the bank
              accounts provided.
            </h1>
            <div className="flex flex-col gap-20 py-10">
              <Render isLoading={isFetching} isError={isError} error={error}>
                {bankAccounts && bankAccounts?.length < 1 ? (
                  <React.Fragment>
                    <div className="flex flex-col items-center justify-center gap-3 text-center">
                      <EmptyData
                        title="Feature Unaccessible"
                        text="to access this feature, you need to add a bank account first"
                        className="p-3"
                      />

                      <button
                        onClick={addBankAccount}
                        className="button-primary flex w-fit items-center justify-center gap-2 text-white"
                      >
                        <PlusIcon className="h-4 w-4" />
                        <span>Add Bank Account</span>
                      </button>
                    </div>
                  </React.Fragment>
                ) : data && data?.length < 1 ? (
                  <EmptyData
                    title="No deposit account available"
                    text="no deposit account available at the moment check back later"
                    className="p-3"
                  />
                ) : (
                  <React.Fragment>
                    <div className="flex grow flex-col gap-10 p-3">
                      {data?.map((item) => (
                        <AccountCard key={item.id} {...item} copy={copy} />
                      ))}
                    </div>
                    <div ref={copiedRef} className="flex flex-col gap-10 p-3">
                      {copied && (
                        <div className="button-ghost mx-3 cursor-default bg-neutral-100 hover:!bg-opacity-100">
                          <p>Copied to clipboard</p>
                        </div>
                      )}

                      <AppButton
                        onClick={confirm}
                        isLoading={confirming}
                        variant="primary"
                        className="highlight-accent w-full text-neutral-base_white"
                        disabled={confirming}
                      >
                        I have made the transfer
                      </AppButton>
                    </div>
                  </React.Fragment>
                )}
              </Render>
            </div>
          </div>
        </AppDrawer>
        <FundingReceiptDialog />
      </ErrorBoundary>
    </React.Fragment>
  );
});
