import ErrorBoundary from "@/components/error-boundary";
import AppDrawer from "@/components/ui/app-drawer";
import * as React from "react";
import useEditListed from "./use-edit-listed";
import Render from "@/components/render";
import { Input } from "@/components/ui/form-input";
import { unitsList } from "./data";
import classNames from "classnames";
import { amountSeparator } from "@/lib/amount-separator";
import { Separator } from "@/components/ui/separator";
import AppButton from "@/components/app-button";

export default React.memo(function EditListedDialog() {
  const {
    isFetching,
    isError,
    error,
    listedProductDetails,
    open,
    formData,
    activeInvestmentDetails,
    isLoading,
    currency,
    updateForm,
    toggleDrawer,
    submit,
  } = useEditListed();

  return (
    <AppDrawer
      title="Edit Listing"
      direction="right"
      open={open}
      handleChange={toggleDrawer}
      footer={
        !isFetching &&
        formData.product_id && (
          <div className="flex h-full grow items-end justify-between gap-5 [&_button]:w-full">
            <AppButton
              variant="primary"
              className="rounded-lg"
              onClick={() => {
                submit("");
              }}
            >
              Update Listing
            </AppButton>

            <AppButton
              variant="outline"
              className="rounded-lg border-primary"
              onClick={() => toggleDrawer(false)}
            >
              Cancel
            </AppButton>
          </div>
        )
      }
    >
      <ErrorBoundary>
        <div className="flex h-full flex-col gap-10 overflow-auto px-4 py-10">
          <Render
            isLoading={isFetching}
            isError={isError}
            error={error}
            loadType="simple"
          >
            <div className="h-full space-y-5">
              <React.Fragment>
                {activeInvestmentDetails && (
                  <div className="flex items-center justify-between gap-10 rounded-lg bg-primary-100 px-10 py-3">
                    <div className="space-y-1 text-center text-neutral-1000">
                      <span className="content-standard">Available Units</span>
                      <h4 className="content-bold">
                        {activeInvestmentDetails.units_purchased}
                      </h4>
                    </div>
                    <Separator
                      orientation="vertical"
                      className="h-11 bg-neutral-400"
                    />
                    <div className="space-y-1 text-center text-neutral-1000">
                      <span className="content-standard">Current Rate</span>
                      <h4 className="content-bold">
                        {currency.sign}{" "}
                        {amountSeparator(listedProductDetails?.product?.unit_price)}
                      </h4>
                    </div>
                  </div>
                )}

                <div className="space-y-3">
                  <Input
                    label="How many units will you want to sell?"
                    placeholder="Enter units"
                    inputMode="numeric"
                    value={formData.units}
                    onChange={(e) => updateForm("units", e)}
                    disabled={isLoading}
                  />
                  <div className="flex flex-wrap gap-2">
                    {unitsList.map((item) => {
                      const cn = classNames(
                        "p-1.5 rounded bg-neutral-100 text-neutral-700 hover:bg-primary hover:text-white transition",
                      );
                      return (
                        <button
                          key={item.id}
                          className={cn}
                          onClick={() => updateForm("units", item.units)}
                        >
                          {amountSeparator(item.units)} Units
                        </button>
                      );
                    })}
                  </div>
                </div>

                <Input
                  value={`${currency.sign} ${amountSeparator(Number(listedProductDetails?.product?.unit_price) * formData.units)} `}
                  disabled
                  readOnly
                />

                <div className="space-y-2">
                  <Input
                    name="asking_price_per_unit"
                    label={`Add Asking Price Per Unit (${currency.sign})`}
                    value={`${formData.asking_price_per_unit}`}
                    onChange={(e) => updateForm("asking_price_per_unit", e)}
                    disabled={isLoading}
                  />
                </div>
              </React.Fragment>
            </div>
          </Render>
        </div>
      </ErrorBoundary>
    </AppDrawer>
  );
});
