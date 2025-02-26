import * as React from "react";
import TransactionDetailsDialog from "./transaction-details.dialog";
import WalletDialog from "./wallet-dialog";
import SettingsDialogs from "./settings-dialogs";
import PinDialogs from "./pin-dialogs";
import InvestmentsDialogs from "./investments-dialogs";
import InsufficientFundDialog from "./insufficient-fund-dialog";
import SuccessDialog from "./success-dialog";

export default function Dialogs() {
  return (
    <React.Fragment>
      <TransactionDetailsDialog />
      <PinDialogs />
      <WalletDialog />
      <InvestmentsDialogs />
      <SettingsDialogs />
      <InsufficientFundDialog />
      <SuccessDialog />
    </React.Fragment>
  );
}
