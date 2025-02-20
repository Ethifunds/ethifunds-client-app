import * as React from "react";

import ProfileDialogs from "./profile-dialogs";
import CardBankDialogs from "./card-bank-dialogs";
export default function SettingsDialogs() {
  return (
    <React.Fragment>
      <ProfileDialogs />
      <CardBankDialogs />
    </React.Fragment>
  );
}
