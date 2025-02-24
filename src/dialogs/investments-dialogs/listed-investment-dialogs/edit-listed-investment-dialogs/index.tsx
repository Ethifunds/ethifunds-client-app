import * as React from "react";
import EditListedDialog from "./edit-listed-dialog";
import PreviewDialog from "./preview-dialog";

export default function EditListedInvestmentDialogs() {
  return (
    <React.Fragment>
      <EditListedDialog />
      <PreviewDialog />
    </React.Fragment>
  );
}
