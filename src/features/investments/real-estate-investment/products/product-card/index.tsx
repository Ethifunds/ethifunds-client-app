import { InvestmentProduct } from "@/types/investments.types";
import { Link } from "react-router-dom";
import * as React from "react";
import useCustomNavigation from "@/hooks/use-navigation";


export default function ProductCard(props: InvestmentProduct) {
const {navigate}= useCustomNavigation()
  const isSoldOut = props.total_units === props.units_sold;
  const availableUnits = Math.floor(props.total_units - props.units_sold);

  const path = `/investments/${props.product_category_id}/products/${props.id}`;
  const handleClick = () => {
    if(isSoldOut) return
    navigate(path)
  }
  
  return (
    <React.Fragment>
      {/* Mobile */}
      <button
        disabled={isSoldOut}
        onClick={handleClick}
        className="flex flex-col items-center text-left rounded-2xl border transition-all hover:shadow-sm active:opacity-50 lg:hidden lg:max-h-[141px]"
      >
        <div className="flex flex-1 gap-5">
          <div className="w-[40%]">
            <img
              src={props.display_image}
              alt=""
              className="size-full rounded-l-2xl object-cover lg:max-h-[141px]"
            />
          </div>
          <div className="flex-1 py-3 space-y-2">
            <div className="text-neutral-1000">
              <h1 className="caption-bold line-clamp-1">{props.name}</h1>
              {/* <span className="caption-standard">
                {capitalize(props.custodian?.name ?? "")}
              </span> */}
            </div>

            <h2 className="caption-bold text-neutral-1000">
              {" "}
              {props.unit_price}{" "}
              <span className="caption-accent text-primary">Per unit</span>
            </h2>
            <h2 className="caption-bold text-neutral-1000">
              {" "}
              <span className="capitalize caption-accent text-neutral-500">
                {props.tenor_value} {props.tenor_unit} tenure
              </span>
            </h2>
            <div className="flex flex-col gap-1">
              <h2 className="flex gap-1 caption-bold text-neutral-1000">
                {" "}
                {props.expected_roi}%{" "}
                <span className="caption-accent text-neutral-500">
                  Expected Returns
                </span>
              </h2>

              {isSoldOut ? (
                <h2 className="caption-accent text-error-200"> Sold Out</h2>
              ) : (
                <h2 className="flex flex-col caption-accent text-neutral-500">
                  {" "}
                  {availableUnits.toLocaleString()}{" "}
                  <span className="text-secondary">Available Units</span>
                </h2>
              )}
            </div>
          </div>
        </div>
      </button>

      {/* Desktop */}
      <div className="hidden max-h-[180px] items-center rounded-2xl border transition-all hover:shadow-sm lg:flex">
        <div className="flex flex-1 gap-8">
          <div className="w-[50%] lg:w-[25%]">
            <img
              src={props.display_image}
              alt=""
              className="size-full max-h-[180px] rounded-l-2xl object-cover"
            />
          </div>
          <div className="py-3 space-y-2">
            <div className="text-neutral-1000">
              <h1 className="feature-accent line-clamp-1">{props.name}</h1>
              {/* <span className="content-standard">
                {capitalize(props.custodian?.name ?? "")}
              </span> */}
            </div>

            <h2 className="highlight-bold text-neutral-1000">
              {" "}
              {props.unit_price}{" "}
              <span className="highlight-accent text-primary">Per unit</span>
            </h2>
            <h2 className="highlight-bold text-neutral-1000">
              {" "}
              <span className="capitalize highlight-accent text-neutral-500">
                {props.tenor_value} {props.tenor_unit} tenure
              </span>
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
