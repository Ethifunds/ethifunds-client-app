import * as React from "react";
import FundWalletDialog from "./fund-wallet-dialog";
import WithdrawalDialog from "./withdrawal-dialog";

export default function WalletDialog() {
	return (
		<React.Fragment>
			<FundWalletDialog />
			<WithdrawalDialog />
		</React.Fragment>
	);
}
