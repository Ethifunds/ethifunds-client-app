import { InvestmentProduct } from "@/types/investments.types";
import { Link } from "react-router-dom";
import * as React from "react";
import capitalize from "@/lib/capitalize";

export default function ProductCard(props: InvestmentProduct) {
  const isSoldOut = props.total_units === props.units_sold;
  const availableUnits = Math.floor(props.total_units - props.units_sold);

  const path = `/investments/${props.product_category_id}/products/${props.id}`;
  return (
    <React.Fragment>
      {/* Mobile */}
      <Link
        to={path}
        className="flex flex-col items-center rounded-2xl border transition-all hover:shadow-sm active:opacity-50 lg:hidden lg:max-h-[141px]"
      >
        <div className="flex flex-1 gap-5">
          <div className="w-[40%]">
            <img
              src={props.display_image}
              alt=""
              className="size-full rounded-l-2xl object-cover lg:max-h-[141px]"
            />
          </div>
          <div className="flex-1 space-y-2 py-3">
            <div className="text-neutral-1000">
              <h1 className="content-bold line-clamp-1">{props.name}</h1>
              <span className="content-standard">
                {capitalize(props.custodian?.name ?? "")}
              </span>
            </div>

            <h2 className="content-bold text-neutral-1000">
              {" "}
              {props.unit_price}{" "}
              <span className="content-accent text-primary">Per unit</span>
            </h2>
            <div className="flex gap-5">
              <h2 className="content-bold flex flex-col text-neutral-1000">
                {" "}
                {props.expected_roi}%{" "}
                <span className="content-accent text-neutral-500">
                  Expected Returns
                </span>
              </h2>

              {isSoldOut ? (
                <h2 className="content-accent text-error-200"> Sold Out</h2>
              ) : (
                <h2 className="content-accent flex flex-col text-neutral-500">
                  {" "}
                  {availableUnits}{" "}
                  <span className="text-secondary">Available Units</span>
                </h2>
              )}
            </div>
          </div>
        </div>
      </Link>

      {/* Desktop */}
      <div className="hidden max-h-[141px] items-center rounded-2xl border transition-all hover:shadow-sm lg:flex">
        <div className="flex flex-1 gap-8">
          <div className="w-[50%] lg:w-[25%]">
            <img
              src={props.display_image}
              alt=""
              className="size-full max-h-[141px] rounded-l-2xl object-cover"
            />
          </div>
          <div className="space-y-2 py-3">
            <div className="text-neutral-1000">
              <h1 className="feature-accent line-clamp-1">{props.name}</h1>
              <span className="content-standard">
                {capitalize(props.custodian?.name ?? "")}
              </span>
            </div>

            <h2 className="highlight-bold text-neutral-1000">
              {" "}
              {props.unit_price}{" "}
              <span className="highlight-accent text-primary">Per unit</span>
            </h2>
            <div className="flex gap-5">
              <h2 className="highlight-bold text-neutral-1000">
                {" "}
                {props.expected_roi}%{" "}
                <span className="highlight-accent text-neutral-500">
                  Expected Returns
                </span>
              </h2>

              {isSoldOut ? (
                <h2 className="highlight-accent text-error-200"> Sold Out</h2>
              ) : (
                <h2 className="highlight-accent text-neutral-500">
                  {" "}
                  {availableUnits}{" "}
                  <span className="text-secondary">Available Units</span>
                </h2>
              )}
            </div>
          </div>
        </div>

        <div className="pr-5">
          <Link
            to={path}
            className="button-outline !rounded-lg border-primary text-primary hover:bg-primary hover:text-white"
          >
            {" "}
            View Details{" "}
          </Link>
        </div>
      </div>
    </React.Fragment>
  );
}
