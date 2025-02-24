import * as React from "react";
import SellUnitsDialog from "./sell-units-dialog";
import PreviewDialog from "./preview-dialog";

export default function SellInvestmentDialogs() {
  return (
    <React.Fragment>
      <SellUnitsDialog />
      <PreviewDialog />
    </React.Fragment>
  );
}
