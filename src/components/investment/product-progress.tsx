import { amountSeparator } from "@/lib/amount-separator";
import * as React from "react";

type ProgressProps = {
  units_sold: number;
  unit_price: string;
  total_units: number;
  sign: string;
};

export default React.memo(function ProductProgress(props: ProgressProps) {
  const amountRaised = Math.floor(
    Number(props.units_sold) * Number(props.unit_price),
  );
  const amountAvailable = Math.floor(
    Number(props.unit_price) * Number(props.total_units),
  );

  const unitsAvailable = props.total_units - props.units_sold;
  
  const progressPercentage = Math.floor(
    (Number(props.units_sold) / Number(props.total_units)) * 100,
  );

  return (
    <div className="space-y-2">
      <div className="w-full h-3 rounded-lg bg-neutral-100">
        <div
          className="h-full transition-all rounded-lg bg-primary"
          style={{
            width: `${progressPercentage > 100 ? "100" : progressPercentage}%`,
          }}
        />
      </div>

      <div className="flex justify-between">
        <h1 className="flex flex-col caption-accent text-neutral-base_black">
          {props.sign}
          {amountSeparator(amountRaised)}{" "}
          <span className="caption-standard">
            {" "}
            Raised ({amountSeparator(props.units_sold)} Unit Sold)
          </span>
        </h1>

        <h1 className="flex flex-col caption-standard text-end">
          {props.sign}

          {amountSeparator(amountAvailable)}
          <span>({amountSeparator(unitsAvailable)} Units Available)</span>
        </h1>
      </div>
    </div>
  );
});
