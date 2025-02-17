import AppContainer from "@/components/container/container";
import useCustomNavigation from "@/hooks/use-navigation";

import { PaginatedResponse } from "@/types/global.types";
import { investmentMarketplaceProduct } from "@/types/investments.types";
import * as React from "react";
import Marketplace from "./marketplace";

type MarketplaceProps = {
  data: PaginatedResponse<investmentMarketplaceProduct>;
};
export default React.memo(function RealEstateProductMarketplace(
  props: MarketplaceProps,
) {
  const { params } = useCustomNavigation();
  const categoryId = Number(params.categoryId);

  if (categoryId !== props.data?.docs[0]?.product?.product_category_id) return;

  return (
    <AppContainer>
      <Marketplace />
    </AppContainer>
  );
});
