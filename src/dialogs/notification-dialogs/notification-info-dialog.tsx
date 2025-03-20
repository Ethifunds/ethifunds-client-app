import * as React from "react";
import useAppSelectors from "@/store/use-app-selectors";
import useActions from "@/store/actions";
import { PopupModal } from "@/components/ui/modal";
import ErrorBoundary from "@/components/error-boundary";
import { NotificationData } from "@/types/notification.types";

export default React.memo(function NotificationInfoDialog() {
  const { type, data } = useAppSelectors("notification");

  const { notification } = useActions();

  const open = React.useMemo(() => {
    return type === "info";
  }, [type]);

  const close = () => {
    notification.resetNotificationDialog();
    notification.changeNotificationDialog({ type: "notifications" });
  };

  const info: NotificationData = React.useMemo(() => data && data, [data]);

  if (!info) return;

  return (
    <ErrorBoundary>
      <PopupModal
        title="Notifications"
        open={open}
        handleClose={close}
        className="hide-scrollbar lg:w-1/3"
        showCloseBtn
      >
        <div className="space-y-5">
          <h1 className="highlight-accent text-neutral-1000">Details</h1>
          <p className="content-standard text-neutral-700">{info.message}</p>

          <button
            className="button-primary w-full text-white"
            onClick={close}
          >
            Dismiss
          </button>
        </div>
      </PopupModal>
    </ErrorBoundary>
  );
});
