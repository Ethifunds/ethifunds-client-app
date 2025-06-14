import * as React from "react";
import useAppSelectors from "@/store/use-app-selectors";
import useActions from "@/store/actions";
import { PopupModal } from "@/components/ui/modal";
import ErrorBoundary from "@/components/error-boundary";
import { NotificationData } from "@/types/notification.types";
import classNames from "classnames";
import { Separator } from "@/components/ui/separator";

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

  console.log(info);

  if (!info) return;
  const title = (info as any).title ?? "";
  const message =
    (info as any).message ?? (info as any).description;
  const msgCn = classNames(
    "first-letter:uppercase line-clamp-1 text-neutral-700",
  );

  const titleCn = classNames("capitalize line-clamp-1 content-accent");

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
          <Separator />
          {title && <h1 className={titleCn}>{title}</h1>}
          <p className={msgCn}>{message}</p>
          <button className="w-full text-white button-primary" onClick={close}>
            Dismiss
          </button>
        </div>
      </PopupModal>
    </ErrorBoundary>
  );
});
