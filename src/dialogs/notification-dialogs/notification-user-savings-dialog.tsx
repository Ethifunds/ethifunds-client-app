import * as React from "react";
import { PopupModal } from "@/components/ui/modal";
import ErrorBoundary from "@/components/error-boundary";
import useAppSelectors from "@/store/use-app-selectors";
import useActions from "@/store/actions";
import { NotificationData } from "@/types/notification.types";
import AppButton from "@/components/app-button";
import { Savings } from "@/types/savings.types";

export default React.memo(function NotificationUserSavingsDialog() {
  const { currency } = useAppSelectors("account");
  const { type, data } = useAppSelectors("notification");

  const { notification } = useActions();

  const open = React.useMemo(() => {
    return type === "user_savings";
  }, [type]);

  const notificationData: NotificationData = React.useMemo(() => data, [data]);

  const close = () => {
    notification.resetNotificationDialog();
    notification.changeNotificationDialog({ type: "notifications" });
  };

  const getDate = (date: string) =>
    new Date(date).toLocaleDateString("en-us", {
      dateStyle: "full",
    });

  if (!notificationData?.user_savings) return;

  const details = notificationData?.user_savings as Savings;

  const productDetails = {
    title: details.ethicoop_cycle.title,
    contribution_amount: `${currency.sign} ${details.contribution_amount} (monthly)`,
    contribution_date: getDate(details.contribution_date),
    RIO: details.ethicoop_cycle.roi,
    funding_source: details.funding_source,
    funding_preference: details.funding_preference,
    start_date: getDate(details?.ethicoop_cycle?.start_date),
    end_date: getDate(details?.ethicoop_cycle?.end_date),
    status: details.status,
  };

  return (
    <PopupModal
      handleClose={close}
      open={open}
      className="relative h-full w-full overflow-auto p-8 lg:w-1/2"
      showCloseBtn
    >
      <ErrorBoundary>
        <div className="flex flex-col gap-8">
          <h1 className="highlight-standard text-neutral-1000">Details</h1>
          <p className="content-standard text-neutral-700">{data?.message}</p>
          <div className="space-y-5 rounded-lg border bg-neutral-50 p-3">
            {Object.entries(productDetails).map(([key, value]) => {
              return (
                <div
                  key={key}
                  className="caption-standard flex justify-between capitalize text-neutral-700"
                >
                  <span className="w-full">{key.replace("_", " ")} </span>
                  <span className="w-full">{value}</span>
                </div>
              );
            })}
          </div>

          <div className="flex gap-5 [&_button]:w-full">
            <AppButton
              variant="mute"
              onClick={close}
              className="w-full !bg-neutral-100"
            >
              Dismiss
            </AppButton>
          </div>
        </div>
      </ErrorBoundary>
    </PopupModal>
  );
});
