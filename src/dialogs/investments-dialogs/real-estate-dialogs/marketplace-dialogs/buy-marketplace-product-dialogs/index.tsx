import * as React from "react";
import MarketplacePurchaseDialog from "./marketplace-purchase-dialogs";
import PreviewDialog from "./preview-dialog";
import SuccessDialog from "./success-dialog";
export default function BuyMarketplaceProductDialogs() {
  return (
    <React.Fragment>
      <MarketplacePurchaseDialog />
      <PreviewDialog />
      <SuccessDialog />
    </React.Fragment>
  );
}
