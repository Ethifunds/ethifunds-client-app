import * as React from "react";
import TabContainer from "../../tab-container";
import { NotificationTabsProps } from "../use-notifications";
import TabForm from "./tab-form";

export default React.memo(function Push(props: NotificationTabsProps) {
  return (
    <TabContainer value="push" className="!space-y-0 !pt-0">
      <TabForm {...props} />
    </TabContainer>
  );
});
