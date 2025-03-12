import * as React from "react";
import BankDialogs from "./bank-dialogs";
import CardDialogs from "./card-dialogs";

export default function CardBankDialogs() {
  return (
    <React.Fragment>
      <BankDialogs />
      <CardDialogs />
    </React.Fragment>
  );
}
