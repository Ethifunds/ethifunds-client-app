import * as React from "react";
import BuyEthivestDialog from "./buy-ethivest-dialog";
import PreviewDialog from "./buy-ethivest-dialog/preview-dialog";
import ProductDetailsDialog from "./product-details-dialog";

export default React.memo(function EthivestDialogs() {
  return (
    <React.Fragment>
      <BuyEthivestDialog />
      <PreviewDialog />
      <ProductDetailsDialog />
    </React.Fragment>
  );
});
