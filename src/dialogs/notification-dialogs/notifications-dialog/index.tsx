import AppDrawer from "@/components/ui/app-drawer";
import * as React from "react";
import NotificationList from "./notification-list";
import useAppSelectors from "@/store/use-app-selectors";
import useActions from "@/store/actions";

export default React.memo(function NotificationsDialog() {
  const { type } = useAppSelectors("notification");

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
      <NotificationList />
    </AppDrawer>
  );
});
