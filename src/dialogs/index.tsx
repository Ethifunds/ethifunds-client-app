import * as React from "react";
import TransactionDetailsDialog from "./transaction-details.dialog";
import WalletDialog from "./wallet-dialog";
import SettingsDialogs from "./settings-dialogs";
import PinDialogs from "./pin-dialogs";
import InvestmentsDialogs from "./investments-dialogs";
import InsufficientFundDialog from "./insufficient-fund-dialog";
import SuccessDialog from "./success-dialog";
import NotificationDialogs from "./notification-dialogs";
import SavingsDialogs from "./savings-dialogs";
import LogoutDialog from "./logout.-dialog";
import useActions from "@/store/actions";

export default function Dialogs() {
  const { ui } = useActions();

  React.useEffect(() => {
    return () => {
      ui.resetDialog();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <React.Fragment>
      <NotificationDialogs />
      <TransactionDetailsDialog />
      <PinDialogs />
      <WalletDialog />
      <InvestmentsDialogs />
      <SavingsDialogs />
      <SettingsDialogs />
      <InsufficientFundDialog />
      <SuccessDialog />
      <LogoutDialog />
    </React.Fragment>
  );
}
