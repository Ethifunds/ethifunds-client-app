import useCustomNavigation from "@/hooks/use-navigation";
import * as React from "react";
import { useQuery } from "react-query";
import Render from "@/components/render";
import ErrorBoundary from "@/components/error-boundary";
import AppContainer from "@/components/container/container";
import useUi from "@/hooks/use-ui";
import RealEstateMarketplaceProductDetails from "../real-estate-investment/real-estate-product-marketplace/real-estate-marketplace-product-details";
import getMarketplaceProductDetails from "@/services/investments/get-marketplace-product-details";

export default function InvestmentMarketplaceProductDetails() {
  const { params } = useCustomNavigation();
  const listingId = Number(params.listingId);
  const categoryId = Number(params.categoryId);
  const { changeBackBtn } = useUi({});

  const { isFetching, isError, error, data } = useQuery(
    ["marketplace-product-details", categoryId, listingId],
    () => getMarketplaceProductDetails({ listingId }),
  );

  React.useLayoutEffect(() => {
    changeBackBtn({
      show: true,
    });
    return () => {
      changeBackBtn(null);
    };
  }, [changeBackBtn]);

  return (
    <AppContainer className="h-full">
      <ErrorBoundary>
        <Render
          isLoading={isFetching}
          isError={isError}
          error={error}
          loadingPosition="center"
        >
          {data && (
            <React.Fragment>
              <RealEstateMarketplaceProductDetails {...data} />
            </React.Fragment>
          )}
        </Render>
      </ErrorBoundary>
    </AppContainer>
  );
}
