import * as React from "react";
import InvestmentVaultDialog from "./investment-vault-dialog";
import RealEstateDialogs from "./real-estate-dialogs";
import SellInvestmentDialogs from "./sell-investment-dialogs";
import ListedInvestmentDialogs from "./listed-investment-dialogs";

export default React.memo(function InvestmentsDialogs() {
  return (
    <React.Fragment>
      <InvestmentVaultDialog />
      <RealEstateDialogs />
      <SellInvestmentDialogs />
      <ListedInvestmentDialogs />
    </React.Fragment>
  );
});
