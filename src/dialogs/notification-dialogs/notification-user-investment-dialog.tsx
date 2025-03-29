import * as React from "react";
import { PopupModal } from "@/components/ui/modal";
import { amountSeparator } from "@/lib/amount-separator";
import ErrorBoundary from "@/components/error-boundary";
import useAppSelectors from "@/store/use-app-selectors";
import useActions from "@/store/actions";
import { NotificationData } from "@/types/notification.types";
import AppButton from "@/components/app-button";
import { ActiveInvestmentInvestments } from "@/types/my-investments.types";
import { useQuery } from "react-query";
import getProductDetails from "@/services/investments/get-product-details";
import Render from "@/components/render";

export default React.memo(function NotificationUserInvestmentDialog() {
  const { currency } = useAppSelectors("account");
  const { type, data } = useAppSelectors("notification");

  const { notification } = useActions();

  const open = React.useMemo(() => {
    return type === "user_investment";
  }, [type]);

  const notificationData: NotificationData = React.useMemo(() => data, [data]);

  const productId = notificationData?.user_investment?.product_id;

  const {
    isFetching,
    isError,
    error,
    data: investmentDetails,
  } = useQuery([productId], () => getProductDetails({ productId }), {
    enabled: !productId && false,
  });

  const close = () => {
    notification.resetNotificationDialog();
    notification.changeNotificationDialog({ type: "notifications" });
  };

  if (!notificationData?.user_investment) return;

  const details =
    notificationData?.user_investment as ActiveInvestmentInvestments;

  const productDetails = {
    date: new Date(details?.created_at ?? "").toLocaleDateString("en-us", {
      dateStyle: "full",
    }),
    investment_type: investmentDetails?.category.display_title,
    investment_name: investmentDetails?.name,
    units_purchased: amountSeparator(details.units_purchased),
    amount_invested: `${currency.sign} ${amountSeparator(details.total_invested)}`,
    RIO: amountSeparator(details.total_roi),
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
        <Render
          isLoading={isFetching}
          isError={isError}
          error={error}
          loadingPosition="center"
        >
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
        </Render>
      </ErrorBoundary>
    </PopupModal>
  );
});
