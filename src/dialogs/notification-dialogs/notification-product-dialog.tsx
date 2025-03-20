import * as React from "react";
import { PopupModal } from "@/components/ui/modal";
import { amountSeparator } from "@/lib/amount-separator";
import ErrorBoundary from "@/components/error-boundary";
import useAppSelectors from "@/store/use-app-selectors";
import useActions from "@/store/actions";
import { NotificationData } from "@/types/notification.types";
import { InvestmentProduct } from "@/types/investments.types";
import AppButton from "@/components/app-button";
import useCustomNavigation from "@/hooks/use-navigation";

export default React.memo(function NotificationProductDialog() {
  const { currency } = useAppSelectors("account");
  const { type, data } = useAppSelectors("notification");
  const { navigate } = useCustomNavigation();

  const { notification } = useActions();

  const open = React.useMemo(() => {
    return type === "product";
  }, [type]);

  const close = () => {
    notification.resetNotificationDialog();
    notification.changeNotificationDialog({ type: "notifications" });
  };

  const notificationData: NotificationData = React.useMemo(() => data, [data]);

  if (!notificationData?.product) return;

  const details = notificationData.product as InvestmentProduct;

  const productDetails = {
    date: new Date(details?.created_at ?? "").toLocaleDateString("en-us", {
      dateStyle: "full",
    }),
    investment_type: details.category.display_title,
    investment_name: details.name,
    unit_price: `${currency.code} ${amountSeparator(details.unit_price)}`,
    RIO: details.expected_roi,
    available_units: `${currency.sign} ${details.total_units}`,
    created_by: details.custodian.name,
    status: details?.status || "",
  };

  const proceedToPurchase = () => {
    const path = `/investments/${details.product_category_id}/products/${details.id}`;
    navigate(path);
    notification.resetNotificationDialog();
  };

  return (
    <PopupModal
      handleClose={close}
      open={open}
      className="relative lg:h-full w-full overflow-auto p-4 lg:p-8 lg:w-1/2"
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

          <div className="flex flex-col lg:flex-row gap-5 [&_button]:lg:w-1/2">
            <AppButton variant="mute" onClick={close}>
              Dismiss
            </AppButton>

            <AppButton onClick={proceedToPurchase} variant="primary">
              Proceed to Purchase
            </AppButton>
          </div>
        </div>
      </ErrorBoundary>
    </PopupModal>
  );
});
