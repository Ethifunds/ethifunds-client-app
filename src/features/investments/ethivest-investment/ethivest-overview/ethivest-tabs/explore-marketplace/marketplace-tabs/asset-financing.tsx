import * as React from "react";
import EthivestTabContainer from "../../ethivest-tab-container";
import { MarketplaceTabsProps } from ".";
import Products from "../products";
import sanitizeText from "@/lib/sanitize-text";

export default React.memo(function AssetFinancing(props: MarketplaceTabsProps) {
  const list = props.data.filter((item) => sanitizeText(item.product_section?.name) === "asset financing");

  return (
    <EthivestTabContainer value="asset_financing">
      <Products data={list} />
    </EthivestTabContainer>
  );
});
