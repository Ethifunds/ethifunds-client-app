import { InvestmentProduct } from "@/types/investments.types";
import * as React from "react";
import AssetFinancing from "./asset-financing";
import SmeFinancing from "./sme-financing";
import LpoFinancing from "./lpo-financing";
import EthivestTabContainer from "../../ethivest-tab-container";
import Products from "../products";

export type MarketplaceTabsProps = {
  data: InvestmentProduct[];
};

export default React.memo(function MarketplaceTabs(
  props: MarketplaceTabsProps,
) {
  return (
    <React.Fragment>
      <EthivestTabContainer value="all">
        <Products data={props.data} />
      </EthivestTabContainer>
      <AssetFinancing {...props} />
      <SmeFinancing {...props} />
      <LpoFinancing {...props} />
    </React.Fragment>
  );
});
