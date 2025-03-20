import * as React from "react";
import ErrorBoundary from "@/components/error-boundary";
import AppButton from "@/components/app-button";
import AppDrawer from "@/components/ui/app-drawer";
import Render from "@/components/render";
import ListingUsername from "./listing-username";
import useListing from "./use-listing";

export default React.memo(function NotificationListingDialog() {
  const {
    open,
    isFetching,
    isError,
    error,
    userData,
    activeUserIsSeller,
    loadingType,
    productDetails,
    toggleShow,
    data,
    account,
    submit,
  } = useListing();

  return (
    <AppDrawer
      title="Offer"
      open={open}
      direction="right"
      handleChange={toggleShow}
      className="hide-scrollbar"
    >
      <ErrorBoundary>
        <Render
          isLoading={isFetching}
          isError={isError}
          error={error}
          loadingPosition="center"
        >
          <div className="flex flex-col gap-8 p-4">
            <p className="content-standard text-neutral-700">{data?.message}</p>
            <div className="space-y-5 rounded-lg border bg-neutral-50 p-3">
              <ListingUsername
                user={activeUserIsSeller ? account : userData!}
                isBuyer={!activeUserIsSeller}
              />
              {Object.entries(productDetails).map(([key, value]) => {
                return (
                  <div
                    key={key}
                    className="caption-standard flex items-center justify-between capitalize text-neutral-700"
                  >
                    <span className="w-full">{key.split("_").join(" ")} </span>
                    <span className="w-full">{value}</span>
                  </div>
                );
              })}
            </div>

            <div className="flex gap-5 [&_button]:w-full">
              <AppButton
                variant="primary"
                onClick={() => submit("approved")}
                isLoading={loadingType === "approved"}
              >
                Accept
              </AppButton>

              <AppButton
                variant="outline"
                onClick={() => submit("rejected")}
                className="border-primary"
                isLoading={loadingType === "rejected"}
              >
                Reject
              </AppButton>
            </div>
          </div>
        </Render>
      </ErrorBoundary>
    </AppDrawer>
  );
});
