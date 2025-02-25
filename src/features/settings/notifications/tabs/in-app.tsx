import * as React from "react";
import TabContainer from "../../tab-container";
import { NotificationTabsProps } from "../use-notifications";
import TabForm from "./tab-form";

export default React.memo(function InApp(props: NotificationTabsProps) {
  return (
    <TabContainer value="in-app" className="!pt-0 !space-y-0">
      <TabForm {...props} />
    </TabContainer>
  );
});