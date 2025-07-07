import TabContainer from "@/features/settings/tab-container";
import * as React from "react";
import Form from "./form";
import GoBack from "@/components/go-back";

export default React.memo(function ChangePasswordTab() {
  return (
    <TabContainer
      value="change_password"
      title="Change Password"
      subTitle="Minimum of 8 characters, at least one uppercase letter, one lowercase letter, one number, and one special character (@#$%*).
"
      className="space-y-8"
      utilityComponent={<GoBack className="absolute -top-7 left-0 text-xs" />}
    >
      <Form />
    </TabContainer>
  );
});
