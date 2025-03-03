import * as React from "react";
import ProfileDialogs from "./profile-dialogs";
import CardBankDialogs from "./card-bank-dialogs";
import TwoFactoryAuthDialogs from "./two-factory-auth-dialogs";

export default function SettingsDialogs() {
  return (
    <React.Fragment>
      <ProfileDialogs />
      <CardBankDialogs />
      <TwoFactoryAuthDialogs />
    </React.Fragment>
  );
}
