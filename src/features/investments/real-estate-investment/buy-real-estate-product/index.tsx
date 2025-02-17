import AppContainer from "@/components/container/container";
import ErrorBoundary from "@/components/error-boundary";
import { Badge } from "@/components/ui/badge";
import useCustomNavigation from "@/hooks/use-navigation";
import capitalize from "@/lib/capitalize";
import { InvestmentProduct } from "@/types/investments.types";

import * as React from "react";
import Form from "./form";

export default React.memo(function BuyRealEstateProduct(
  props: InvestmentProduct,
) {
  const { params } = useCustomNavigation();
  const categoryId = Number(params.categoryId);

  if (props.product_category_id !== categoryId) return;

  const formProps = {
    unit_price: props.unit_price,
    available_units: props.total_units - props.units_sold,
  };
  return (
    <AppContainer>
      <ErrorBoundary>
        <div className="space-y-10">
          <div className="space-y-3">
            <Badge className="highlight-standard border-success-100 !bg-[#A4F4E74D] text-success-300">
              Real Estate
            </Badge>
            <div className="flex flex-col justify-between gap-2 text-neutral-1000">
              <h1 className="feature-bold capitalize">{props.name}</h1>
              <span className="highlight-accent">
                {capitalize(props.custodian.name)}
              </span>
            </div>
            {/* <span>Buy your way into an investment of a lifetime.</span> */}
          </div>
          <Form {...formProps} />
        </div>
      </ErrorBoundary>
    </AppContainer>
  );
});
