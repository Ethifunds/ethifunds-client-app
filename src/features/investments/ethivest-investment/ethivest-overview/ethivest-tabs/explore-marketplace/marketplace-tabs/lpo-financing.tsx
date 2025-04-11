import * as React from "react";
import EthivestTabContainer from "../../ethivest-tab-container";
import { MarketplaceTabsProps } from ".";
import Products from "../products";
import sanitizeText from "@/lib/sanitize-text";

export default React.memo(function LpoFinancing(props: MarketplaceTabsProps) {
  const list = props.data.filter((item) => sanitizeText(item.product_section?.name) === "lpo financing");

  return (
    <EthivestTabContainer value="lpo_financing">
      <Products data={list} />
    </EthivestTabContainer>
  );
});
