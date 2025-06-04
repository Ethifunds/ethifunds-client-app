import AppDrawer from "@/components/ui/app-drawer";
import * as React from "react";
import useSavingsPreference from "./use-savings-preference";
import { Input } from "@/components/ui/form-input";
import { amountList } from "./data";
import { amountSeparator } from "@/lib/amount-separator";
import SelectBox from "@/components/select-box";
import AppButton from "@/components/app-button";
import { DatePicker } from "@/components/ui/date-picker";
import Render from "@/components/render";

export default React.memo(function SavingsPreferenceDialog() {
  const {
    open,
    isFetching,
    isError,
    error,
    data,
    isLoading,
    formData,
    sign,
    fundingSourceOptions,
    fundingPreferenceOptions,
    toggleDrawer,
    updateForm,
    submit,
  } = useSavingsPreference();

  return (
    <AppDrawer
      title="Ethicoop Savings"
      open={open}
      direction="right"
      handleChange={toggleDrawer}
      className="overflow-y-auto"
      footer={
        <div className="">
          <AppButton
            variant="primary"
            onClick={submit}
            isLoading={isLoading}
            disabled={data && data.cycle?.id ? false : true}
            className="w-full"
          >
            Submit
          </AppButton>
        </div>
      }
    >
      <div className="flex h-full flex-col gap-5 overflow-y-auto p-4">
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
              Contribution Date{" "}
              <small className="cation-standard">
                (you will be charged on this date)
              </small>
            </label>
            <DatePicker
              name="contribution_date"
              triggerStyle="w-full"
              value={formData.contribution_date}
              showOutsideDays={false}
              onChange={(value) => updateForm("contribution_date", value)}
              disabled={isLoading}
            />
          </div>

          <div>
            <SelectBox
              name="funding_preference"
              label="Funding Preference"
              placeholder="--Select--"
              value={formData.funding_preference}
              onchange={(e) => updateForm("funding_preference", e)}
              options={fundingPreferenceOptions}
              disabled={isLoading}
            />
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
