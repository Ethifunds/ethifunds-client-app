import * as React from "react";
import EthivestTabContainer from "../ethivest-tab-container";
import { useQuery } from "react-query";
import { Badge } from "@/components/ui/badge";
import { amountSeparator } from "@/lib/amount-separator";
import getMyInvestmentCategoryDetails from "@/services/my-investments/get-my-investment-category-details";
import useCustomNavigation from "@/hooks/use-navigation";
import Render from "@/components/render";
import getProductDetails from "@/services/investments/get-product-details";
import ensureError from "@/lib/ensure-error";
import { toast } from "sonner";
import { useAppSelector } from "@/store/hooks";
import EmptyData from "@/components/empty-data";
import { assets } from "@/constants";
import ErrorBoundary from "@/components/error-boundary";
import useActions from "@/store/actions";
import { ActiveInvestmentProduct } from "@/types/investments.types";

type List = ActiveInvestmentProduct & {
  display_image: string;
  product_name: string;
};
export default React.memo(function OngoingInvestments() {
  const { currency } = useAppSelector((state) => state.account);
  const { params } = useCustomNavigation();
  const [list, setList] = React.useState<List[]>([]);
  const [settled, setSettled] = React.useState(false);

  const categoryId = params.categoryId ?? "";

  const { ui } = useActions();

  const { isFetching, isError, error } = useQuery(
    ["ongoing-ethivest-investment"],
    () => getMyInvestmentCategoryDetails({ categoryId }),
    {
      onSuccess: async (data) => {
        const investments = data.investments.map((item) => item);

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
    <EthivestTabContainer value="ongoing_investments">
      <Render
        isLoading={isFetching || !settled}
        isError={isError}
        error={error}
      >
        <ErrorBoundary>
          <div className="flex flex-col gap-5">
            {settled && list.length < 1 ? (
              <EmptyData
                title="No ongoing Investment"
                text="You don't have an Active Investment. All ongoing investment will appear here."
              />
            ) : (
              list?.map((item, idx) => (
                <div
                  key={idx}
                  className="flex rounded-xl border p-4 transition hover:shadow-md cursor-pointer"
                  onClick={() => click(item.id.toString())}
                >
                  <div className="flex grow items-center gap-5">
                    <Badge className="flex size-12 items-center justify-center rounded-full bg-secondary-100">
                      <img
                        src={item.display_image}
                        alt={item.product_name}
                        className="h-auto w-full object-fill"
                      />
                    </Badge>

                    <div className="flex flex-col gap-1">
                      <h1 className="highlight-accent text-neutral-1000">
                        {item.product_name}
                      </h1>

                      <span className="content-standard text-neutral-700">
                        Amount Invested {" - "}
                        <span className="content-accent">
                          {currency.sign}
                          {amountSeparator(item.total_invested)}
                        </span>
                      </span>
                      <span className="content-standard text-neutral-700">
                        Return of Investment {" - "}
                        <span className="content-accent">
                          {amountSeparator(item.total_roi)}%
                        </span>
                      </span>
                    </div>
                  </div>

                  <img
                    src={assets.arrow_left_01}
                    alt=""
                    className="rotate-180"
                  />
                </div>
              ))
            )}
          </div>
        </ErrorBoundary>
      </Render>
    </EthivestTabContainer>
  );
});
