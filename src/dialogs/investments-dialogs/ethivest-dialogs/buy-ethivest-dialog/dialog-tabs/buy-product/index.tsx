import * as React from "react";
import { TabsContent } from "@/components/ui/tabs";
import { EthivestTabsProps } from "../../use-buy-ethivest";
import { useAppSelector } from "@/store/hooks";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/form-input";
import classNames from "classnames";
import { unitsList } from "./data";
import { amountSeparator } from "@/lib/amount-separator";

export default React.memo(function BuyProduct(props: EthivestTabsProps) {
  const { currency } = useAppSelector((state) => state.account);
  const data = props.data;
  const formData = props.formData;

  return (
    <TabsContent
      value="buy_product"
      className="-mt-10 flex flex-col gap-5 py-5"
    >
      <h1 className="content-standard text-neutral-500">
        Use the form below to buy units from this investment.
      </h1>

      <div className="flex items-center justify-between gap-10 rounded-lg bg-primary-100 px-10 py-3">
        <div className="space-y-1 text-center text-neutral-1000">
          <span className="content-standard">Available Units</span>
          <h4 className="content-bold">{amountSeparator(data.total_units - data.units_sold)}</h4>
        </div>
        <Separator orientation="vertical" className="h-11 bg-neutral-400" />
        <div className="space-y-1 text-center text-neutral-1000">
          <span className="content-standard">Current Rate</span>
          <h4 className="content-bold">
            {currency.sign} {data.unit_price}
          </h4>
        </div>
      </div>

      <div className="space-y-3">
        <Input
          label="How many units will you want to sell?"
          placeholder="Enter units"
          inputMode="numeric"
          value={formData.units}
          onChange={(e) => props.updateForm("units", e)}
          disabled={props.isLoading}
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
                onClick={() => props.updateUnits(Number(item.units))}
              >
                {amountSeparator(item.units)} Units
              </button>
            );
          })}
        </div>
      </div>

      <Input
        label={`Cost Price (${currency.sign})`}
        value={amountSeparator(Math.floor(formData.units * Number(data.unit_price)))}
        onChange={(e) => props.updateForm("units", e)}
        className="bg-neutral-100"
        readOnly
        disabled
      />
    </TabsContent>
  );
});
