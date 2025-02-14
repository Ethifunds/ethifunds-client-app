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

  const progressPercentage = Math.floor(
    (Number(props.units_sold) / Number(props.total_units)) * 100,
  );

  return (
    <div className="space-y-2">
      <div className="h-3 w-full rounded-lg bg-neutral-100">
        <div
          className="h-full rounded-lg bg-primary transition-all"
          style={{
            width: `${progressPercentage > 100 ? "100" : progressPercentage}%`,
          }}
        />
      </div>

      <div className="flex justify-between">
        <h1 className="caption-accent text-neutral-base_black">
          {props.sign}
          {amountSeparator(amountRaised)}{" "}
          <span className="caption-standard">
            {" "}
            raised ({props.units_sold} Unit Sold)
          </span>
        </h1>

        <h1 className="caption-standard">
          {props.sign}
          {amountSeparator(amountAvailable)}({props.total_units} Units
          Available)
        </h1>
      </div>
    </div>
  );
});
