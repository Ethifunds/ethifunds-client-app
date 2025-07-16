import * as React from "react";
import FundWalletDialog from "./fund-wallet-dialog";
import WithdrawalDialog from "./withdrawal-dialog";
import FundWalletWithPaystackDialog from "./fund-wallet-with-paystack-dialog";

export default function WalletDialog() {
	return (
		<React.Fragment>
			<FundWalletDialog />
			<WithdrawalDialog />
			<FundWalletWithPaystackDialog />
		</React.Fragment>
	);
}
