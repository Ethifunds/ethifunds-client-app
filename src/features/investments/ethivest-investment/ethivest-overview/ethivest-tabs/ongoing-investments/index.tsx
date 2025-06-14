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
import EmptyData from "@/components/empty-data";
import { assets } from "@/constants";
import ErrorBoundary from "@/components/error-boundary";
import useActions from "@/store/actions";
import { ActiveInvestmentProduct } from "@/types/investments.types";
import useAppSelectors from "@/store/use-app-selectors";

type List = ActiveInvestmentProduct & {
  display_image: string;
  product_name: string;
};
export default React.memo(function OngoingInvestments() {
  const { currency } = useAppSelectors("account");
  const { params, queryParams } = useCustomNavigation();
  const [list, setList] = React.useState<List[]>([]);
  const [settled, setSettled] = React.useState(false);

  const { ui } = useActions();
  const categoryId = React.useMemo(
    () => params.categoryId ?? "",
    [params.categoryId],
  );
  const enable = React.useMemo(
    () => queryParams.has("tab", "ongoing_investments") ,
    [queryParams],
  );

  const { isFetching, isError, error } = useQuery(
    ["ongoing-ethivest-investment",enable],
    () => getMyInvestmentCategoryDetails({ categoryId }),
    {
      // enabled:enable,
      onSuccess: async (data) => {
        const investments = data.investments.map((item) => item);
        if (investments.length < 1) {
          setSettled(true);

          return;
        }
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
                  className="flex p-4 transition border cursor-pointer rounded-xl hover:shadow-md"
                  onClick={() => click(item.product_id.toString())}
                >
                  <div className="flex items-center gap-5 grow">
                    <Badge className="flex items-center justify-center rounded-full size-12 bg-secondary-100">
                      <img
                        src={item.display_image}
                        alt={item.product_name}
                        className="object-fill w-full h-auto"
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
