import * as React from "react";
import Push from "./push";
import Email from "./email";
import InApp from "./in-app";
import { NotificationTabsProps } from "../use-notifications";

export default function NotificationTabs(props: NotificationTabsProps) {
  return (
    <React.Fragment>
      <Email {...props} />
      <InApp {...props} />
      <Push {...props} />
    </React.Fragment>
  );
}
