import { InvestmentProduct } from "@/types/investments.types";

import * as React from "react";
import {  CardContent, CardTitle } from "@/components/ui/card";
import { useAppSelector } from "@/store/hooks";
import { amountSeparator } from "@/lib/amount-separator";
import ProductImg from "./product-img";
import ProductLabel from "./product-label";
import useActions from "@/store/actions";

export default function ProductCard(props: InvestmentProduct) {
  const { currency } = useAppSelector((state) => state.account);
  const { ui } = useActions();
  const isSoldOut = props.total_units === props.units_sold;
  const availableUnits = Math.floor(props.total_units - props.units_sold);

  const click = () => {
    ui.changeDialog({
      show: true,
      type: "buy_ethivest_product",
      id: props.id.toString(),
    });
  };

  return (
    <React.Fragment>
      <div onClick={click}>
        <div className="cursor-pointer space-y-5 rounded-lg border transition hover:shadow lg:space-y-0">
          <ProductImg
            name={props.name}
            section={props.section}
            display_image={props.display_image}
          />
          <CardContent className="space-y-3 px-2 py-4">
            <CardTitle className="space-y-1 md:h-16">
              <div className="flex justify-between">
                <ProductLabel label={props.label} />
                <span className="line-clamp-1 text-sm text-neutral-500">
                  {props.custodian.name}
                </span>
              </div>
              <h1 className="highlight-bold line-clamp-2">{props.name}</h1>
            </CardTitle>

            <div className="flex items-center gap-3">
              <h1 className="highlight-bold text-neutral-1000">
                {currency.sign} {amountSeparator(props.unit_price)}{" "}
              </h1>
              <span className="highlight-accent text-primary">Per Unit</span>
            </div>

            <div className="flex items-center gap-3">
              <h6 className="caption-accent text-neutral-700">
                {props.tenor_value} {props.tenor_unit} Tenure
              </h6>
            </div>

            <div className="flex items-center gap-3">
              <h1 className="highlight-bold text-success-200">
                {props.expected_roi}%
              </h1>
              <span className="highlight-accent text-neutral-500">
                Expected Return
              </span>
            </div>

            <div className="flex items-center gap-3">
              {isSoldOut ? (
                <h2 className="content-accent text-error-200"> Sold Out</h2>
              ) : (
                <React.Fragment>
                  {" "}
                  <h1 className="highlight-bold text-neutral-1000">
                    {amountSeparator(availableUnits)}
                  </h1>
                  <span className="highlight-accent text-secondary">
                    Available Units
                  </span>{" "}
                </React.Fragment>
              )}
            </div>
          </CardContent>
        </div>
      </div>
    </React.Fragment>
  );
}
