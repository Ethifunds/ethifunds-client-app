import AppDrawer from "@/components/ui/app-drawer";
import * as React from "react";
import useBuyEthivest from "./use-buy-ethivest";
import { Tabs } from "@/components/ui/tabs";
import DialogTabs from "./dialog-tabs";
import Render from "@/components/render";
import AppButton from "@/components/app-button";

export default React.memo(function BuyEthivestDialog() {
  const {
    isFetching,
    isError,
    error,
    data,
    open,
    isLoading,
    activeTab,
    formData,
    updateForm,
    updateUnits,
    changeTab,
    toggleDrawer,
    goBack,
    invest,
    proceedToPayment,
  } = useBuyEthivest();

  return (
    <AppDrawer
      title="Investment Details"
      direction="right"
      open={open}
      handleChange={toggleDrawer}
      footer={
        !isFetching && (
          <div className="flex justify-between gap-5 [&_button]:w-full [&_button]:rounded-lg">
            {activeTab === "product_details" ? (
              <AppButton
                variant="primary"
                className="w-full"
                onClick={invest}
                disabled={isLoading}
              >
                Invest
              </AppButton>
            ) : (
              <React.Fragment>
                <AppButton
                  variant="mute"
                  className="bg-neutral-100 text-neutral-700"
                  onClick={goBack}
                  disabled={isLoading}
                >
                  Go Back
                </AppButton>

                <AppButton
                  variant="primary"
                  onClick={proceedToPayment}
                  disabled={isLoading}
                >
                  Proceed To Payment
                </AppButton>
              </React.Fragment>
            )}
          </div>
        )
      }
      className="overflow-y-auto hideScrollbar"
    >
      <Tabs
        defaultValue={activeTab}
        value={activeTab}
        className="h-full !space-y-0 overflow-auto p-4"
      >
        <Render
          isLoading={isFetching}
          isError={isError}
          error={error}
          loadingBoxClass="h-full"
          loadingPosition="center"
        >
          {data && (
            <DialogTabs
              data={data}
              changeTab={changeTab}
              formData={formData}
              updateForm={updateForm}
              updateUnits={updateUnits}
              isLoading={isLoading}
            />
          )}
        </Render>
      </Tabs>
    </AppDrawer>
  );
});
