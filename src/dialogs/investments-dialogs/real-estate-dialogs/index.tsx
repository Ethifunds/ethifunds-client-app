import * as React from "react";
import SuccessDialog from "./buy-product-dialogs/success-dialog";
import MarketplaceDialogs from "./marketplace-dialogs";

export default React.memo(function RealEstateDialogs() {
  return (
    <React.Fragment>
      <SuccessDialog />
      <MarketplaceDialogs />
    </React.Fragment>
  );
});
