import ErrorBoundary from "@/components/error-boundary";
import AppDrawer from "@/components/ui/app-drawer";
import * as React from "react";
import useSellUnits from "./use-sell-units";
import { assets } from "@/constants";
import Render from "@/components/render";
import SelectBox from "@/components/select-box";
import { Input } from "@/components/ui/form-input";
import { unitsList } from "./data";
import classNames from "classnames";
import { amountSeparator } from "@/lib/amount-separator";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import AppTooltip from "@/components/ui/app-tooltip";
import AppButton from "@/components/app-button";

export default React.memo(function SellUnits() {
  const {
    isFetching,
    isError,
    error,
    open,
    warningMsg,
    formData,
    productOptions,
    productDetails,
    showAskPrice,
    isLoading,
    unitCosts,
    currency,
    updateForm,
    toggleAskPrice,
    toggleDrawer,
    setSaleOption,
    submit,
  } = useSellUnits();

  return (
    <ErrorBoundary>
      <AppDrawer
        title="Sell Investment"
        direction="right"
        open={open}
        handleChange={toggleDrawer}
        footer={
          formData.product_id && (
            <div className="flex h-full grow items-end justify-between gap-5 [&_button]:w-full">
              <AppButton
                variant="primary"
                className="rounded-lg"
                onClick={() => {
                  setSaleOption("ethifunds");
                  submit("");
                }}
              >
                Sell to Ethifunds
              </AppButton>

              <AppButton
                variant="outline"
                className="rounded-lg border-primary"
                onClick={() => {
                  setSaleOption("marketplace");
                  submit("");
                }}
              >
                List to Marketplace
              </AppButton>
            </div>
          )
        }
      >
        <div className="flex h-full flex-col gap-10 overflow-auto px-4 py-10">
          <div className="flex items-start gap-3 rounded-lg bg-error-100/20 p-4">
            <img src={assets.info_icon_01} alt="info" />
            <p>{warningMsg}</p>
          </div>

          <Render
            isLoading={isFetching}
            isError={isError}
            error={error}
            loadType="simple"
          >
            <div className="h-full space-y-5">
              <SelectBox
                name="product_id"
                label="Product to sell"
                placeholder="Select Product"
                value={String(formData.product_id)}
                onchange={(e) => updateForm("product_id", e)}
                options={productOptions}
                disabled={isLoading}
              />

              {formData.product_id && (
                <React.Fragment>
                  {productDetails && (
                    <div className="flex items-center justify-between gap-10 rounded-lg bg-primary-100 px-10 py-3">
                      <div className="space-y-1 text-center text-neutral-1000">
                        <span className="content-standard">
                          Available Units
                        </span>
                        <h4 className="content-bold">
                          {productDetails.units_purchased}
                        </h4>
                      </div>
                      <Separator
                        orientation="vertical"
                        className="h-11 bg-neutral-400"
                      />
                      <div className="space-y-1 text-center text-neutral-1000">
                        <span className="content-standard">Current Rate</span>
                        <h4 className="content-bold">
                          {currency.sign} {productDetails.unit_price}
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
                    value={`${currency.sign} ${amountSeparator(unitCosts)} `}
                    disabled
                    readOnly
                  />

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="asking_price"
                        className="flex items-center gap-1"
                      >
                        Add Asking Price
                        <AppTooltip
                          trigger={
                            <img src={assets.info_icon_02} alt="info icon" />
                          }
                          content={
                            <p className="caption-standard w-full !bg-primary-100 p-2">
                              {" "}
                              Toggle Add asking price to enter an ask price
                              <br />
                              defaults to the current price if not set.
                            </p>
                          }
                        />
                      </label>

                      <Switch
                        checked={showAskPrice}
                        className="data-[state=checked]:bg-primary"
                        onCheckedChange={toggleAskPrice}
                        disabled={isLoading}
                        aria-readonly
                      />
                    </div>
                    {showAskPrice && (
                      <Input
                        name="asking_price"
                        value={`${formData.asking_price}`}
                        onChange={(e) => updateForm("asking_price", e)}
                        disabled={isLoading}
                      />
                    )}
                  </div>
                </React.Fragment>
              )}
            </div>
          </Render>
        </div>
      </AppDrawer>
    </ErrorBoundary>
  );
});
