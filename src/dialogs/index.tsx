import * as React from "react";
import TransactionDetailsDialog from "./wallet-dialog/transaction-details.dialog";
import SetPinDialog from "./set-pin-dialog";
import InvestmentVaultDialog from "./investment-vault-dialog";
import WalletDialog from "./wallet-dialog";

export default function Dialogs() {
	return (
		<React.Fragment>
			<TransactionDetailsDialog />
			<SetPinDialog />
			<WalletDialog />
			<InvestmentVaultDialog />
		</React.Fragment>
	);
}
