import * as React from "react";
import NotificationsDialog from "./notifications-dialog";
import NotificationInfoDialog from "./notification-info-dialog";
import NotificationProductDialog from "./notification-product-dialog";
import NotificationUserInvestmentDialog from "./notification-user-investment-dialog";
import NotificationUserSavingsDialog from "./notification-user-savings-dialog";
import NotificationListingDialog from "./notification-listing-dialog";

export default React.memo(function NotificationDialogs() {
  return (
    <React.Fragment>
      <NotificationsDialog />
      <NotificationInfoDialog />
      <NotificationProductDialog />
      <NotificationUserInvestmentDialog />
      <NotificationUserSavingsDialog />
      <NotificationListingDialog />
    </React.Fragment>
  );
});
