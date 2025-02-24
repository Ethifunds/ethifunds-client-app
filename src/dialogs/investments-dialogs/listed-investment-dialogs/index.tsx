import * as React from "react";
import RemoveListingDialog from "./remove-listing-dialog";
import EditListedInvestmentDialogs from "./edit-listed-investment-dialogs";

export default function ListedInvestmentDialogs() {
  return (
    <React.Fragment>
      <RemoveListingDialog />
      <EditListedInvestmentDialogs />
    </React.Fragment>
  );
}
