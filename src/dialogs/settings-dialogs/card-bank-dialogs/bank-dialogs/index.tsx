import * as React from "react";
import AddBankDialogs from "./add-bank-dialog";
import RemoveBankDialog from "./remove-bank-dialog";

export default function BankDialogs() {
  return (
    <React.Fragment>
      <AddBankDialogs />
      <RemoveBankDialog />
    </React.Fragment>
  );
}
