import Render from "@/components/render";
import useCustomNavigation from "@/hooks/use-navigation";
import useUi from "@/hooks/use-ui";
import getProductMarketplace from "@/services/investments/get-product-marketplace";
import * as React from "react";
import { useQuery } from "react-query";
import RealEstateProductMarketplace from "../real-estate-investment/real-estate-product-marketplace";

export default function InvestmentMarketplace() {
  const { changeBackBtn } = useUi({});
  const { params } = useCustomNavigation();
  const productId = Number(params.productId);

  const { isFetching, isError, error, data } = useQuery(
    ["product-marketplace", productId],
    () => getProductMarketplace({ productId }),
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
            <RealEstateProductMarketplace data={data} />
          </React.Fragment>
        )}
      </Render>
    </React.Fragment>
  );
}
