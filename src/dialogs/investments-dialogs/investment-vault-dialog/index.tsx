import * as React from "react";
import FundVaultDialog from "./fund-vault-dialog";
import VaultWithdrawalDialog from "./vault-withdrawal-dialog";

export default React.memo(function InvestmentVaultDialog() {
  return (
    <React.Fragment>
      <FundVaultDialog />
      <VaultWithdrawalDialog />
    </React.Fragment>
  );
});
