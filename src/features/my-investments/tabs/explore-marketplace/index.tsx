import * as React from "react";
import TabContainer from "../tab-container";
import { useQuery } from "react-query";
import exploreMarketplace from "@/services/my-investments/explore-marketplace";
import EmptyData from "@/components/empty-data";
import { Link } from "react-router-dom";
import { useAppSelector } from "@/store/hooks";
import ErrorBoundary from "@/components/error-boundary";
import Render from "@/components/render";

export default React.memo(function ExploreMarketPlace() {
  const { currency } = useAppSelector((state) => state.account);
  const { isFetching, isError, error, data } = useQuery(
    ["explore-marketplace"],
    () => exploreMarketplace(), {
      refetchOnMount:false
    }
  );

  return (
    <TabContainer value="marketplace">
      <Render
        isLoading={isFetching}
        isError={isError}
        error={error}
        loadingBoxClass="col-span-full"
      >
        <ErrorBoundary>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
            {data && data?.length < 1 ? (
              <EmptyData
                className="col-span-full"
                text="No marketplace listing available for this product at the moment"
              />
            ) : (
              data?.map((item) => (
                <Link
                  key={item.id}
                  to={`/investments/${item.product.product_category_id}/products/${item.product_id}/marketplace/${item.id}`}
                >
                  <div className="cursor-pointer space-y-5 rounded-lg border border-neutral-200 bg-white text-stone-950 shadow-sm transition hover:lg:shadow lg:space-y-0">
                    
                      <div className="max-h-56">
                        <img
                          src={item.product.display_image}
                          alt={item.product.name}
                          className="size-full object-cover"
                        />
                      </div>
                    <div className="space-y-3 px-2 py-4">
                      <div className="md:h-16">
                        <h1 className="highlight-bold line-clamp-2">
                          {item.product.name}
                        </h1>
                        <span className="highlight-accent line-clamp-1 text-neutral-500">
                          {item.product.custodian?.name}
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <h1 className="highlight-bold text-neutral-1000">
                          {currency.sign} {item.asking_price_per_unit}{" "}
                        </h1>
                        <span className="highlight-accent text-primary">
                          Per Unit
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <h1 className="highlight-bold text-success-200">
                          {item.product.expected_roi}%
                        </h1>
                        <span className="highlight-accent text-neutral-500">
                          Expected Return
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <h1 className="highlight-bold text-neutral-1000">
                          {item.units}
                        </h1>
                        <span className="highlight-accent text-secondary">
                          Available Units
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </ErrorBoundary>
      </Render>
    </TabContainer>
  );
});
