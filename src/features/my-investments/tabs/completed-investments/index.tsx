import * as React from "react";
import TabContainer from "../tab-container";
import Render from "@/components/render";
import { useQuery } from "react-query";
import getMyCompletedInvestments from "@/services/my-investments/get-my-completed-investments";
import EmptyData from "@/components/empty-data";

import { useAppSelector } from "@/store/hooks";
import { amountSeparator } from "@/lib/amount-separator";
import { Badge } from "@/components/ui/badge";
import getMyInvestmentCategoryDetails from "@/services/my-investments/get-my-investment-category-details";
import Spinner from "@/components/spinner";
import useCustomNavigation from "@/hooks/use-navigation";

export default React.memo(function CompletedInvestments() {
  const { currency } = useAppSelector((state) => state.account);
  const { queryParams } = useCustomNavigation();

  const isActiveTab = React.useMemo(
    () => queryParams.has("tab", "completed_investments"),
    [queryParams],
  );

  const { isFetching, isError, error, data } = useQuery(
    ["completed-investments", isActiveTab],
    () => getMyCompletedInvestments(),
  );


  return (
    <TabContainer value="completed_investments">
      <Render isLoading={isFetching} isError={isError} error={error}>
        <div className="flex flex-col gap-5">
          {data && data.length < 1 ? (
            <EmptyData
              title="No completed Investment yet"
              text="you don't have any completed investment yet. All completed investment will appear here."
            />
          ) : (
            data?.map((item) => {
              return (
                <div
                  key={item.id}
                  className="flex items-center rounded-lg border p-3 shadow"
                >
                  <div className="flex flex-grow items-center gap-3">
                    <InvestmentImage
                      categoryId={item.product.product_category_id}
                    />
                    <div className="">
                      <span className="caption-standard text-neutral-500">
                        {item.product.name}
                      </span>
                      <h1 className="highlight-accent text-neutral-1000">
                        {currency.sign} {amountSeparator(item.total_invested)}
                      </h1>
                    </div>
                  </div>

                  <div className="flex items-center gap-5">
                    <div className="">
                      <h1 className="highlight-accent text-neutral-1000">
                        {currency.sign} {amountSeparator(item.interest_accrued)}
                      </h1>
                      <span className="caption-standard text-neutral-500">
                        Interest Earned
                      </span>
                    </div>

                    <Badge className="caption-standard bg-success-100/50 capitalize text-success-300">
                      {item.status}
                    </Badge>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </Render>
    </TabContainer>
  );
});

function InvestmentImage(props: { categoryId: number }) {
  const { isFetching, data } = useQuery(
    ["investment-category-img", props.categoryId],
    () =>
      getMyInvestmentCategoryDetails({
        categoryId: props.categoryId.toString(),
      }),
  );
  return (
    <Badge className="flex size-12 items-center justify-center rounded-full bg-secondary-100">
      {isFetching ? (
        <Spinner />
      ) : (
        <img
          src={data?.category.display_image}
          alt={data?.category.name}
          className="size-full rounded-full object-contain"
        />
      )}
    </Badge>
  );
}
