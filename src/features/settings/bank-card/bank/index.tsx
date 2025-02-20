import * as React from "react";
import TabContainer from "../../tab-container";
import { useQuery } from "react-query";
import getUserAccounts from "@/services/settings/bank/get-user-accounts";
import { useAppSelector } from "@/store/hooks";
import { BankAccount } from "@/types/bank-account.types";
import Render from "@/components/render";
import NoBankAccount from "./no-bank-account";
import AccountList from "./account-list";
import useActions from "@/store/actions";
import useCustomNavigation from "@/hooks/use-navigation";

export default React.memo(function Bank() {
  const { currency } = useAppSelector((state) => state.account);
  const [bankAccounts, setBankAccounts] = React.useState<BankAccount[]>([]);
  const { ui } = useActions();
  const { queryParams } = useCustomNavigation();
  const hasAction = queryParams.has("action");

  const { isFetching, isError, error } = useQuery(
    ["bank-accounts", currency.code, hasAction],
    () => getUserAccounts({ currency: currency.code }),
    {
      enabled: !hasAction && true,
      onSuccess(data) {
        setBankAccounts(data);
      },
    },
  );

  const openAddBankDrawer = () => {
    queryParams.set("action", "add_bank");
    ui.changeDialog({
      show: true,
      type: "add_new_bank",
    });
  };

  return (
    <TabContainer
      value="bank"
      title="Bank Account"
      subTitle="Add a bank account for withdrawals. Note that we cannot process third party withdrawals, hence your account must be connected to your BVN or your bank account name must be similar to your registered name."
      className="w-full space-y-5 py-0"
    >
      <div className="flex justify-center lg:w-3/5">
        <Render isLoading={isFetching} isError={isError} error={error}>
          {bankAccounts.length < 1 ? (
            <NoBankAccount open={openAddBankDrawer} />
          ) : (
            <AccountList data={bankAccounts} open={openAddBankDrawer} />
          )}
        </Render>
      </div>
    </TabContainer>
  );
});
