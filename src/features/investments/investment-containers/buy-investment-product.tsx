import useCustomNavigation from "@/hooks/use-navigation";
import BuyRealEstateProduct from "../real-estate-investment/buy-real-estate-product";
import * as React from "react";
import { useQuery } from "react-query";
import getProductDetails from "@/services/investments/get-product-details";
import Render from "@/components/render";
import useUi from "@/hooks/use-ui";

export default function BuyInvestmentProduct() {
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
    <React.Fragment>
      <Render
        isLoading={isFetching}
        isError={isError}
        error={error}
        loadingPosition="center"
      >
        {data && (
          <React.Fragment>
            <BuyRealEstateProduct {...data} />
          </React.Fragment>
        )}
      </Render>
    </React.Fragment>
  );
}
