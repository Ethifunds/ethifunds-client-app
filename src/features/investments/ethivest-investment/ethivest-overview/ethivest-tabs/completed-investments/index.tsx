import * as React from "react";
import EthivestTabContainer from "../ethivest-tab-container";
import { useQuery } from "react-query";
import { Badge } from "@/components/ui/badge";
import { amountSeparator } from "@/lib/amount-separator";
import Render from "@/components/render";
import getProductDetails from "@/services/investments/get-product-details";
import ensureError from "@/lib/ensure-error";
import { toast } from "sonner";
import { useAppSelector } from "@/store/hooks";
import EmptyData from "@/components/empty-data";

import ErrorBoundary from "@/components/error-boundary";
import useActions from "@/store/actions";
import getCompletedInvestments from "@/services/investments/get-completed-investments";
import { CompletedInvestmentProduct } from "@/types/investments.types";
import useCustomNavigation from "@/hooks/use-navigation";

type List = CompletedInvestmentProduct & {
  display_image: string;
  product_name: string;
};
export default React.memo(function CompletedInvestments() {
  const { currency } = useAppSelector((state) => state.account);
  const [list, setList] = React.useState<List[]>([]);
  const [settled, setSettled] = React.useState(false);
  const { params } = useCustomNavigation();

  const category_id = params.categoryId ?? "";

  const { ui } = useActions();

  const { isFetching, isError, error } = useQuery(
    ["completed-investments", category_id],
    () => getCompletedInvestments({ category_id }),
    {
      onSuccess: async (data) => {
        const investments = data.map((item) => item);

        if (investments.length < 1) return setSettled(true);

        const productList = await Promise.all(
          investments.map(async (item) => {
            try {
              const response = await getProductDetails({
                productId: item.product_id,
              });
              return {
                display_image: response.category.display_image,
                product_name: response.name,
                ...item,
              };
            } catch (err) {
              const errMsg = ensureError(err).message;
              toast.error(errMsg);
              throw err;
            }
          }),
        );

        if (productList.length) {
          setList(productList);
          setSettled(true);
        }
      },
      onError() {
        setSettled(true);
      },
    },
  );

  const click = (id: string) => {
    ui.changeDialog({
      show: true,
      type: "ethivest_product_details",
      id: id,
    });
  };

  return (
    <EthivestTabContainer value="completed_investments">
      <Render
        isLoading={isFetching || !settled}
        isError={isError}
        error={error}
      >
        <ErrorBoundary>
          <div className="flex flex-col gap-5">
            {settled && list.length < 1 ? (
              <EmptyData
                title="No Completed Investment Yet"
                text="You don't have any Completed Investment. All completed investments will appear here."
              />
            ) : (
              list?.map((item) => (
                <div
                  onClick={() => click(item.id.toString())}
                  key={item.id}
                  className="flex cursor-pointer items-center rounded-lg border p-3 shadow"
                >
                  <div className="flex flex-grow items-center gap-3">
                    <Badge className="flex size-12 items-center justify-center rounded-full bg-secondary-100">
                      <img
                        src={item.display_image}
                        alt={item.product_name}
                        className="h-auto w-full object-fill"
                      />
                    </Badge>
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
              ))
            )}
          </div>
        </ErrorBoundary>
      </Render>
    </EthivestTabContainer>
  );
});
