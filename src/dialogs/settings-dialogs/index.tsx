import * as React from "react";
import ProfileDialogs from "./profile-dialogs";
import CardBankDialogs from "./card-bank-dialogs";
import DocumentsDialogs from "./documents-dialogs";
import SecurityDialogs from "./security-dialogs";

export default function SettingsDialogs() {
  return (
    <React.Fragment>
      <ProfileDialogs />
      <SecurityDialogs />
      <CardBankDialogs />
      <DocumentsDialogs />
    </React.Fragment>
  );
}
