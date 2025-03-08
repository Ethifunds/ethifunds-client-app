import AppButton from "@/components/app-button";
import Render from "@/components/render";
import { TabsContent } from "@/components/ui/tabs";
import useWithdrawFunds from "./use-withdraw-funds";
import AccountCard from "./account-card";
import { Input } from "@/components/ui/form-input";
import { PlusCircle } from "lucide-react";
import { ChangeTab } from "../../use-withdrawal";
import { BankAccount } from "@/types/bank-account.types";
import * as React from "react";
import { sanitizeNumInput } from "@/lib/sanitize-num-input";
import ErrorBoundary from "@/components/error-boundary";

type WithdrawFundsProps = {
	changeTab: ChangeTab;
	addedAccount: BankAccount | null;
};

export default React.memo(function WithdrawFunds(props: WithdrawFundsProps) {
	const {
		isFetching,
		isError,
		error,
		bankAccounts,
		currency,
		sending,
		selected,
		submitRef,
		updateList,
		setAmount,
		select,
		submit,
	} = useWithdrawFunds(props.changeTab);

	const changeTab = () => {
		props.changeTab("add_account");
	};

	const prependToList = React.useCallback(() => {
		if (!props.addedAccount) return;
		updateList(props.addedAccount);
	}, [props.addedAccount, updateList]);

	React.useEffect(() => {
		prependToList();
	}, [prependToList]);

	return (
    <ErrorBoundary>
      <TabsContent value="withdraw_funds" className="h-svh lg:h-screen">
        <div className="mt-10 flex h-full flex-col space-y-5 overflow-auto px-5">
          <h1 className="content-standard text-neutral-500">
            Please enter the amount and select the bank account you wish to
            withdraw funds to.
          </h1>

          <Input
            label={`Amount (${currency.sign})`}
            placeholder="Enter Amount"
            inputMode="numeric"
            onChange={(e) => setAmount(sanitizeNumInput(e.target.value))}
          />

          <div className="flex flex-col gap-3">
            <Render
              isLoading={isFetching}
              isError={isError}
              error={error}
              loadingBoxClass="!h-auto"
            >
              {bankAccounts.map((item) => (
                <AccountCard
                  key={item.id}
                  {...item}
                  selected={selected?.id === item.id}
                  select={select}
                />
              ))}
            </Render>
            <button
              onClick={changeTab}
              className="flex items-center gap-5 rounded-lg bg-primary-100 px-5 py-4 text-primary"
            >
              <PlusCircle size={40} strokeWidth={1} />
              <span>Add New Bank Account</span>
            </button>
          </div>
          <div
            ref={submitRef}
            className="flex grow flex-col justify-end gap-10 pb-10"
          >
            <AppButton
              onClick={submit}
              isLoading={sending}
              variant="primary"
              className="highlight-accent w-full text-neutral-base_white"
              disabled={sending}
            >
              Continue
            </AppButton>
          </div>
        </div>
      </TabsContent>
    </ErrorBoundary>
  );
});
