import * as React from "react";
import DefaultTab from "./default-tab";
import TransactionPinTab from "./transaction-pin-tab/index.tsx";
import SecurityQuestionsTab from "./security-questions-tab";
import ChangePasswordTab from "./change-password-tab";
import TwoFactoryAuthTab from "./two-factory-auth-tab";

export default function SecurityTabs() {
  return (
    <React.Fragment>
      <DefaultTab />
      <TransactionPinTab />
      <SecurityQuestionsTab />
      <ChangePasswordTab />
      <TwoFactoryAuthTab />
    </React.Fragment>
  );
}
