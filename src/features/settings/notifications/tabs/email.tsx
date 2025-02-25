import * as React from "react";
import TabContainer from "../../tab-container";
import { NotificationTabsProps } from "../use-notifications";
import TabForm from "./tab-form";

export default React.memo(function Email(props: NotificationTabsProps) {
  return (
    <TabContainer value="email" className="!pt-0 !space-y-0">
      <TabForm {...props} />
    </TabContainer>
  );
});
