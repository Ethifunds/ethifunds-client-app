import useCustomNavigation from "@/hooks/use-navigation";
import { InvestmentProduct } from "@/types/investments.types";
import * as React from "react";
import DetailsBox from "./details-box";
import MetricsBox from "./metrics-box";
import { Link } from "react-router-dom";
import ErrorBoundary from "@/components/error-boundary";

export default React.memo(function RealEstateProductDetails(
  props: InvestmentProduct,
) {
  const { params } = useCustomNavigation();
  const categoryId = Number(params.categoryId);

  if (categoryId !== props.product_category_id) return;

  const isSoldOut = props.total_units === props.units_sold;

  return (
    <ErrorBoundary>
      <div className="flex flex-col items-start gap-10 lg:flex-row">
        <div className="w-full lg:w-1/5">
          <img
            src={props.display_image}
            alt={props.name.slice(0, 5)}
            className="size-full max-h-96 rounded-lg object-cover"
          />
        </div>

        <div className="w-full space-y-8">
          <DetailsBox {...props} />
          <MetricsBox />
          <div className="flex">
            <Link
              to={`${!isSoldOut ? "buy" : "marketplace"}`}
              className={`${isSoldOut ? "button-outline border-primary text-primary" : "button-primary text-white"} highlight-bold w-full rounded-lg lg:w-1/3`}
            >
              {isSoldOut ? "REIT Marketplace" : "Buy Now"}
            </Link>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
});
