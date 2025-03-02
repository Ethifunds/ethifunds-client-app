import ErrorBoundary from "@/components/error-boundary";
import useUi from "@/hooks/use-ui";
import { investmentMarketplaceProduct } from "@/types/investments.types";
import InfiniteScroll from "@/components/container/infinite-scroll";
import getProductMarketplace from "@/services/investments/get-product-marketplace";
import useCustomNavigation from "@/hooks/use-navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppSelector } from "@/store/hooks";
import { Link } from "react-router-dom";
import EmptyData from "@/components/empty-data";
import { amountSeparator } from "@/lib/amount-separator";

export default function Marketplace() {
  useUi({ title: "REIT Marketplace" });
  const { params } = useCustomNavigation();
  const productId = Number(params.productId);
  const { currency } = useAppSelector((state) => state.account);

  return (
    <ErrorBoundary>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        <InfiniteScroll<investmentMarketplaceProduct>
          queryKey={["product-marketplace", productId.toString()]}
          fetchData={(page: number) =>
            getProductMarketplace({ page, productId })
          }
          renderItem={(item) => (
            <Link to={`${item.id}`}>
              <Card className="cursor-pointer space-y-5 transition hover:shadow lg:space-y-0">
                <CardHeader className="p-0">
                  <div className="max-h-56">
                    <img
                      src={item.product.display_image}
                      alt={item.product.name}
                      className="size-full object-cover"
                    />
                  </div>
                </CardHeader>
                <CardContent className="space-y-3 px-2 py-4">
                  <CardTitle className="md:h-16">
                    <h1 className="highlight-bold line-clamp-2">
                      {item.product.name}
                    </h1>
                    <span className="highlight-accent text-neutral-500">
                      {item.seller_investment_info.user.username}
                    </span>
                  </CardTitle>

                  <div className="flex items-center gap-3">
                    <h1 className="highlight-bold text-neutral-1000">
                      {currency.sign} {amountSeparator(item.asking_price_per_unit)}{" "}
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
                      {amountSeparator(item.units)}
                    </h1>
                    <span className="highlight-accent text-secondary">
                      Available Units
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          )}
          emptyData={
            <EmptyData
              className="col-span-full"
              text="No marketplace listing available for this product at the moment"
            />
          }
        />
      </div>
    </ErrorBoundary>
  );
}
