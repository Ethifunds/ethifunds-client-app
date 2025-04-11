import * as React from "react";
import EthivestTabContainer from "../../ethivest-tab-container";
import { MarketplaceTabsProps } from ".";
import Products from "../products";
import sanitizeText from "@/lib/sanitize-text";

export default React.memo(function SmeFinancing(props: MarketplaceTabsProps) {
  const list = props.data.filter((item) =>sanitizeText(item.product_section?.name) === "sme financing");

  return (
    <EthivestTabContainer value="sme_financing">
      <Products data={list} />
    </EthivestTabContainer>
  );
});
