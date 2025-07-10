import AppDrawer from "@/components/ui/app-drawer";
import * as React from "react";
import useFundSavings from "./use-fund-savings";
import { Input } from "@/components/ui/form-input";
import { amountList } from "./data";
import { amountSeparator } from "@/lib/amount-separator";
import SelectBox from "@/components/select-box";
import AppButton from "@/components/app-button";

export default React.memo(function FundSavingsWalletDialog() {
  const {
    open,
    isLoading,
    formData,
    sign,
    fundingSourceOptions,
    toggleDrawer,
    updateForm,
    submit,
  } = useFundSavings();

  return (
    <AppDrawer
      title="Ethicoop Savings"
      open={open}
      direction="right"
      handleChange={toggleDrawer}
      className="overflow-y-auto"
      footer={
        <div className="flex gap-3 justify-between">
          <AppButton
            variant="primary"
            onClick={submit}
            isLoading={isLoading}
            disabled={isLoading}
            className="w-full"
          >
            Fund Wallet
          </AppButton>
        </div>
      }
    >
      <div className="flex overflow-y-auto flex-col gap-5 p-4 h-full">
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
      </div>
    </AppDrawer>
  );
});
