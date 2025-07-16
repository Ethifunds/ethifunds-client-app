import AppButton from "@/components/app-button";
import AppDrawer from "@/components/ui/app-drawer";
import * as React from "react";
import useFundWallet from "./use-fund-wallet";
import ErrorBoundary from "@/components/error-boundary";
import { Input } from "@/components/ui/form-input";
import PaystackPopup from "./paystack-popup";

export default React.memo(function FundWalletWithPaystackDialog() {
  const {
    open,
    toggleShow,
    code,
    amount,
    setAmount,
    showPaystack,
    fundWallet,
    handleClose,
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
          <div className="overflow-auto pt-10 h-screen hide-scrollbar">
            <h1 className="px-3 content-standard text-neutral-500">
              Kindly enter the amount you want to fund your wallet with.
            </h1>

            <div className="flex flex-col gap-10 px-3 py-10">
              <Input
                type="number"
                label={`Amount (${code})`}
                placeholder="Enter amount"
                className="w-full"
                value={amount ?? ""}
                onChange={(e) => setAmount(Number(e.target.value))}
              />

              <AppButton
                variant="primary"
                onClick={fundWallet}
                disabled={!amount}
              >
                Fund Wallet
              </AppButton>
            </div>
          </div>
        </AppDrawer>
      </ErrorBoundary>
      {showPaystack && (
        <PaystackPopup
          close={handleClose}
          amount={amount ?? 0}
        />
      )}
    </React.Fragment>
  );
});
