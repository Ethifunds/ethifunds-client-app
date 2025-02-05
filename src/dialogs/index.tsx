import * as React from "react";
import TransactionDetailsDialog from "./wallet/transaction-details.dialog";
import FundWalletDialog from "./wallet/fund-wallet-dialog";
import FundingReceiptDialog from "./wallet/fund-wallet-dialog/funding-receipt.dialog";
import WithdrawalDialog from "./wallet/withdrawal-dialog";
import WithdrawalReceiptDialog from "./wallet/withdrawal-dialog/withdrawal-receipt.dialog";
import SetPinDialog from "./set-pin-dialog";
import FundVaultDialog from "./vault/fund-vault-dialog";
import VaultWithdrawalDialog from "./vault/vault-withdrawal-dialog";

export default function Dialogs() {
	return (
		<React.Fragment>
			<TransactionDetailsDialog />
			<FundWalletDialog />
			<FundingReceiptDialog />
			<WithdrawalDialog />
			<WithdrawalReceiptDialog />
			<SetPinDialog />
			<FundVaultDialog />
			<VaultWithdrawalDialog />
		</React.Fragment>
	);
}
