import * as React from "react";
import TransactionDetailsDialog from "./wallet/transaction-details.dialog";
import FundWalletDialog from "./wallet/fund-wallet-dialog";
import FundingReceiptDialog from "./wallet/fund-wallet-dialog/funding-receipt.dialog";
import WithdrawalDialog from "./wallet/withdrawal-dialog";
import WithdrawalReceiptDialog from "./wallet/withdrawal-dialog/withdrawal-receipt.dialog";
import PinDialog from "./pin-dialog";

export default function Dialogs() {
	return (
		<React.Fragment>
			<TransactionDetailsDialog />
			<FundWalletDialog />
			<FundingReceiptDialog />
			<WithdrawalDialog />
			<WithdrawalReceiptDialog />
			<PinDialog />
		</React.Fragment>
	);
}
