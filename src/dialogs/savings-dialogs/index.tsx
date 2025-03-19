import * as React from "react";
import SavingPreferenceDialog from "./saving-preference-dialog";
import SavingsTransactionDetailsDialog from "./savings-transaction-details.dialog";

export default React.memo(function SavingsDialogs() {
  return (
    <React.Fragment>
      <SavingPreferenceDialog />
      <SavingsTransactionDetailsDialog />
    </React.Fragment>
  );
});
