import AppDrawer from "@/components/ui/app-drawer";
import * as React from "react";
import useSavingsPreference from "./use-savings-preference";
import { Input } from "@/components/ui/form-input";
import { amountList } from "./data";
import { amountSeparator } from "@/lib/amount-separator";
import SelectBox from "@/components/select-box";
import AppButton from "@/components/app-button";
import Render from "@/components/render";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { InfoIcon } from "lucide-react";

export default React.memo(function SavingsPreferenceDialog() {
  const {
    open,
    isFetching,
    isError,
    error,
    isLoading,
    formData,
    sign,
    fundingSourceOptions,
    toggleDrawer,
    updateForm,
    submit,
    data,
    enableAutoFunding,
    disableAutoFunding,
  } = useSavingsPreference();

  return (
    <AppDrawer
      title="Ethicoop Savings"
      open={open}
      direction="right"
      handleChange={toggleDrawer}
      className="overflow-y-auto"
      footer={
        <div className="flex gap-3 justify-between">
          {data?.status === "active" ? (
            <React.Fragment>
              <AppButton
                variant="mute"
                onClick={disableAutoFunding}
                disabled={isLoading || isFetching}
                className="w-full caption-standard bg-neutral-100"
              >
                Pause Auto-Funding
              </AppButton>

              <AppButton
                variant="primary"
                onClick={submit}
                isLoading={isLoading}
                disabled={isLoading || isFetching}
                className="w-full"
              >
                Submit
              </AppButton>
            </React.Fragment>
          ) : (
            <AppButton
              variant="primary"
              onClick={enableAutoFunding}
              isLoading={isLoading}
              disabled={isLoading || isFetching}
              className="w-full"
            >
              Enable Auto-Funding
            </AppButton>
          )}
        </div>
      }
    >
      <div className="flex overflow-y-auto flex-col gap-5 p-4 h-full">
        <Render isLoading={isFetching} isError={isError} error={error}>
          <span className="content-standard text-neutral-500">
            Shariah-compliant cooperative savings wallet that enables group
            savings with a minimum monthly contribution of N50,000.
          </span>
          <div className="space-y-3">
            <Input
              label={`Amount (${sign})`}
              placeholder="Enter Amount"
              inputMode="numeric"
              value={formData.amount}
              onChange={(e) => updateForm("amount", e.target.value)}
              disabled={isLoading}
            />
            <div className="flex flex-wrap gap-2">
              {amountList.map((item) => (
                <button
                  key={item.id}
                  className={"rounded bg-neutral-100 p-1.5 text-neutral-700"}
                  onClick={() => updateForm("amount", item.amount)}
                  disabled={isLoading}
                >
                  {sign}
                  {amountSeparator(item.amount)}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="contribution_date">
              Charge Day{" "}
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <InfoIcon className="w-4 h-4" />
                  </TooltipTrigger>
                  <TooltipContent>
                    Pick a day of the month <br /> to charge your funding source
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </label>
            <Input
              type="number"
              step={1}
              min={1}
              max={31}
              placeholder="Choose a charge day"
              value={formData.contribution_date}
              onChange={(e) => updateForm("contribution_date", e.target.value)}
            />
            {/* <DatePicker
              name="contribution_date"
              triggerStyle="w-full"
              value={formData.contribution_date}
              showOutsideDays={false}
              onChange={(value) => updateForm("contribution_date", value)}
              disabled={isLoading}
            /> */}
          </div>

          <div>
            <SelectBox
              name="funding_source"
              label="Funding Source"
              placeholder="--Select--"
              value={formData.funding_source}
              onchange={(e) => updateForm("funding_source", e)}
              options={fundingSourceOptions}
              disabled={isLoading}
            />
          </div>
        </Render>
      </div>
    </AppDrawer>
  );
});
