import * as React from "react";
import SavingPreferenceDialog from "./saving-preference-dialog";
import SavingsTransactionDetailsDialog from "./savings-transaction-details.dialog";
import FundSavingsWalletDialog from "./fund-savings-wallet-dialog";
import InitiateWithdrawal from "./initiate-withdrawal";

export default React.memo(function SavingsDialogs() {
  return (
    <React.Fragment>
      <SavingPreferenceDialog />
      <SavingsTransactionDetailsDialog />
      <FundSavingsWalletDialog />
      <InitiateWithdrawal />
    </React.Fragment>
  );
});
