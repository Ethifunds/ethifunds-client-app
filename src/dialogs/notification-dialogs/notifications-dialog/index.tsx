import AppDrawer from "@/components/ui/app-drawer";
import * as React from "react";
import NotificationList from "./notification-list";
import useAppSelectors from "@/store/use-app-selectors";
import useActions from "@/store/actions";
import EmptyData from "@/components/empty-data";
import { assets } from "@/constants";

export default React.memo(function NotificationsDialog() {
  const { type, notifications } = useAppSelectors("notification");

  const { notification } = useActions();
  const open = React.useMemo(() => {
    return type === "notifications";
  }, [type]);

  const toggleShow = () => {
    notification.resetNotificationDialog();
  };

  return (
    <AppDrawer
      title="Notifications"
      open={open}
      direction="right"
      handleChange={toggleShow}
      className="hide-scrollbar"
    >
      {notifications.length > 0 ? (
        <NotificationList />
      ) : (
        <EmptyData
          title="No notification yet"
          text="You don't have any notification yet all notifications will appear here."
          icon={assets.notification_icon_01}
        />
      )}
    </AppDrawer>
  );
});
