import * as React from "react";
import InvestmentVaultDialog from "./investment-vault-dialog";
import RealEstateDialogs from "./real-estate-dialogs";

export default React.memo(function InvestmentsDialogs() {
  return (
    <React.Fragment>
      <InvestmentVaultDialog />
      <RealEstateDialogs />
    </React.Fragment>
  );
});
