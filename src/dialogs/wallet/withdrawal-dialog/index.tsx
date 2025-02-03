import AppDrawer from "@/components/ui/app-drawer";
import * as React from "react";
import useWithdrawal from "./use-withdrawal";
import { Tabs } from "@/components/ui/tabs";
import WithdrawFunds from "./tabs/withdraw-funds/index.tsx";
import AddAccount from "./tabs/add-account";
import { BankAccount } from "@/types/bank-account.types";

export default React.memo(function WithdrawalDialog() {
	const { open, activeTab, toggleShow, changeTab } = useWithdrawal();
	const [addedAccount, setAddedAccount] = React.useState<BankAccount | null>(null);

	return (
		<AppDrawer
			title="Withdraw Funds"
			open={open}
			direction="right"
			handleChange={toggleShow}
			className="overflow-auto hide-scrollbar"
			
		>
			<Tabs defaultValue={"withdraw_funds"} value={activeTab} onValueChange={changeTab}>
				<WithdrawFunds addedAccount={addedAccount} changeTab={changeTab} />
				<AddAccount setAddedAccount={setAddedAccount} changeTab={changeTab} />
			</Tabs>
		</AppDrawer>
	);
});
