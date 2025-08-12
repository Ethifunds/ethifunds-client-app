import AppContainer from "@/components/container/container";
import ErrorBoundary from "@/components/error-boundary";
import { Badge } from "@/components/ui/badge";
import useCustomNavigation from "@/hooks/use-navigation";
import { InvestmentProduct } from "@/types/investments.types";

import * as React from "react";
import Form from "./form";
import { useAppSelector } from "@/store/hooks";
import { amountSeparator } from "@/lib/amount-separator";

export default React.memo(function BuyRealEstateProduct(
  props: InvestmentProduct,
) {
  const { currency } = useAppSelector((state) => state.account);
  const { params } = useCustomNavigation();
  const categoryId = Number(params.categoryId);

  if (props.product_category_id !== categoryId) return;

  const formProps = {
    unit_price: props.unit_price,
    available_units: props.total_units - props.units_sold,
    minimum_investment:
      Number(props.minimum_investment) * Number(props.unit_price),
    maximum_investment: props.maximum_investment
      ? Number(props.maximum_investment)*Number(props.unit_price)
      : null,
  };
  return (
    <AppContainer>
      <ErrorBoundary>
        <div className="space-y-10">
          <div className="space-y-3">
            <Badge className="highlight-standard border-success-100 !bg-[#A4F4E74D] text-success-300">
              Real Estate
            </Badge>
            <div className="flex flex-col gap-2 justify-between text-neutral-1000">
              <h1 className="capitalize feature-bold">{props.name}</h1>
              <div className="flex flex-col highlight-standard text-neutral-500">
                <span>
                  {" "}
                  Minimum investment: {currency.sign}{" "}
                  {amountSeparator(formProps.minimum_investment)}
                </span>
                <span>
                  {" "}
                  Maximum investment:{" "}
                  {formProps.maximum_investment
                    ? currency.sign +
                      " " +
                      amountSeparator(formProps.maximum_investment)
                    : "N/A"}
                </span>
                {/* {capitalize(props.custodian?.name??"")} */}
              </div>
            </div>
            {/* <span>Buy your way into an investment of a lifetime.</span> */}
          </div>

          <Form {...formProps} />
        </div>
      </ErrorBoundary>
    </AppContainer>
  );
});
