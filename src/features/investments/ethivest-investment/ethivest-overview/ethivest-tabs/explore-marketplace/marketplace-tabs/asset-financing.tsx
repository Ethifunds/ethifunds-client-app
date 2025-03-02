import * as React from "react";
import EthivestTabContainer from "../../ethivest-tab-container";
import { MarketplaceTabsProps } from ".";
import Products from "../products";

export default React.memo(function AssetFinancing(props: MarketplaceTabsProps) {
  const list = props.data.filter((item) => item.section === "asset_financing");

  return (
    <EthivestTabContainer value="asset_financing">
      <Products data={list} />
    </EthivestTabContainer>
  );
});
