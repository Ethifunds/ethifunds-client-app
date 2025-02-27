import * as React from "react";
import CurrencyPicker from "@/components/currency-picker";
import { amountSeparator } from "@/lib/amount-separator";
import classNames from "classnames";
import useBalance from "./use-balance";
import ErrorBoundary from "@/components/error-boundary";
import { MyActiveInvestment } from "@/types/my-investments.types";
import { assets, infos } from "@/constants";
import AppTooltip from "@/components/ui/app-tooltip";

type BalanceProps = {
  sum: number;
  category: MyActiveInvestment["category"];
  aggregate: number;
};
export default React.memo(function Balance(props: BalanceProps) {
  const { currency, sign, changeCurrency, buyUnits, sellUnits } = useBalance();

  const container = classNames(
    "py-8 px-6 border rounded-lg shrink-0 lg:shrink w-full lg:w-[60%] min-h-48 lg:min-h-52",
  );
  return (
    <ErrorBoundary>
      <div className={container}>
        <div className="flex flex-col gap-6">
          <div className="flex justify-between">
            <div className="flex flex-col gap-5">
              <h1 className="content-standard text-neutral-700">
                {props.category.name}
              </h1>
              <h2 className="heading-4 uppercase">
                {sign} {amountSeparator(props.sum ?? "")}
              </h2>
            </div>

            <div>
              <CurrencyPicker
                currency={currency}
                setCurrency={changeCurrency}
              />
            </div>
          </div>

          <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
            <div className="flex w-full min-w-20 max-w-fit flex-nowrap items-center gap-3 rounded-sm border p-2">
              <span>{amountSeparator(props.aggregate)} Units</span>

              <AppTooltip
                trigger={<img src={assets.info_icon_03} alt="info icon" />}
                content={infos.tooltipInfo.units_aggregate.content}
              />
            </div>
            <div className="flex w-full grow gap-5 lg:justify-end">
              <button
                onClick={buyUnits}
                className="button-primary w-full !rounded-lg !py-2 text-white lg:w-1/3"
              >
                Buy Units
              </button>

              <button
                onClick={sellUnits}
                className="button-outline w-full !rounded-lg !border-primary !py-2 text-primary lg:w-1/3"
              >
                Sell Units
              </button>
            </div>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
});
