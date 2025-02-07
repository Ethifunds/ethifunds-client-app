import * as React from "react";
import TransactionDetailsDialog from "./wallet-dialog/transaction-details.dialog";
import SetPinDialog from "./set-pin-dialog";
import InvestmentVaultDialog from "./investment-vault-dialog";
import WalletDialog from "./wallet-dialog";
import SettingsDialogs from "./settings-dialogs";

export default function Dialogs() {
	return (
		<React.Fragment>
			<TransactionDetailsDialog />
			<SetPinDialog />
			<WalletDialog />
			<InvestmentVaultDialog />
			<SettingsDialogs />
		</React.Fragment>
	);
}
