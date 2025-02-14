import * as React from "react";
import SuccessDialog from "./buy-product-dialogs/success-dialog";

export default React.memo(function BuyProductDialogs() {
  return (
    <React.Fragment>
      <SuccessDialog />
    </React.Fragment>
  );
});
