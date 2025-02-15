import useCustomNavigation from "@/hooks/use-navigation";
import getProductDetails from "@/services/investments/get-product-details";
import * as React from "react";
import RealEstateProductDetails from "../real-estate-investment/real-estate-product-details";
import { useQuery } from "react-query";
import Render from "@/components/render";
import ErrorBoundary from "@/components/error-boundary";
import AppContainer from "@/components/container/container";
import useUi from "@/hooks/use-ui";

export default function InvestmentProductDetails() {
  const { params } = useCustomNavigation();
  const productId = Number(params.productId);
  const categoryId = Number(params.categoryId);
  const { changeBackBtn } = useUi({});

  const { isFetching, isError, error, data } = useQuery(
    ["product-details", categoryId, productId],
    () => getProductDetails({ productId }),
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
              <RealEstateProductDetails {...data} />
            </React.Fragment>
          )}
        </Render>
      </ErrorBoundary>
    </AppContainer>
  );
}
