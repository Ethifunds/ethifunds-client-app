import * as React from "react";
import { TabsContent } from "@/components/ui/tabs";
import { EthivestTabsProps } from "../../use-buy-ethivest";
import { useAppSelector } from "@/store/hooks";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/form-input";
import classNames from "classnames";
import { unitsList } from "./data";
import { amountSeparator } from "@/lib/amount-separator";
import useExtras from "@/hooks/use-extras";
import SelectBox from "@/components/select-box";

export default React.memo(function BuyProduct(props: EthivestTabsProps) {
  const { currency } = useAppSelector((state) => state.account);
  const { fundingSources } = useExtras();
  const data = props.data;
  const formData = props.formData;

  const allowedSources = ["user_wallet", "investment_vault"];
  const options = fundingSources
    .filter((item) => allowedSources.includes(item.id))
    .map((item) => ({
      title: item.name,
      value: item.id,
    }));

  return (
    <TabsContent
      value="buy_product"
      className="flex flex-col gap-5 py-5 -mt-10"
    >
      <h1 className="content-standard text-neutral-500">
        Use the form below to buy units from this investment.
      </h1>

      <div className="flex gap-10 justify-between items-center px-10 py-3 rounded-lg bg-primary-100">
        <div className="space-y-1 text-center text-neutral-1000">
          <span className="content-standard">Available Units</span>
          <h4 className="content-bold">
            {amountSeparator(data.total_units - data.units_sold)}
          </h4>
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
          label="How many units do you want to buy?"
          placeholder="Enter units"
          inputMode="numeric"
          type="number"
          min={Number(data.minimum_investment)}
          max={
            data.maximum_investment
              ? Number(data.maximum_investment)
              : undefined
          }
          step={1}
          containerStyle="[&>label]:!normal-case"
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
        label={`Cost price (${currency.sign})`}
        value={amountSeparator(
          Math.floor(formData.units * Number(data.unit_price)),
        )}
        onChange={(e) => props.updateForm("units", e)}
        className="bg-neutral-100"
        readOnly
        disabled
      />

      <SelectBox
        label="Funding Source"
        name="funding_source"
        value={formData.funding_source}
        onchange={(e) => props.updateForm("funding_source", e)}
        placeholder="--Select--"
        options={options}
        containerStyle={"space-y-1"}
        className="w-full"
      />
    </TabsContent>
  );
});




// const { fundingSources } = useExtras();

// const updateForm = (
//   name: FormKeys,
//   e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> | string,
// ) => {
//   if (props.updateForm) {
//     if (typeof e === "string") {
//       return props.updateForm(name, e);
//     }
//     props.updateForm(name, e.target.value);
//   }
// };

// const options = fundingSources
//   .filter((item) => item.id.includes("user_wallet"))
//   .map((item) => ({
//     title: item.name,
//     value: item.id,
//   }));



// <SelectBox
//   label="Fund From"
//   name="funding_source"
//   value={props.fromValue.funding_source}
//   onchange={(e) => updateForm("funding_source", e)}
//   placeholder="--Select--"
//   options={options}
//   containerStyle={"space-y-1"}
//   className="w-full"
// />;