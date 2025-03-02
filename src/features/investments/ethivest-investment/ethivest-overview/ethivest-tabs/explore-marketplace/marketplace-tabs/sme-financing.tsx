import * as React from "react";
import EthivestTabContainer from "../../ethivest-tab-container";
import { MarketplaceTabsProps } from ".";
import Products from "../products";

export default React.memo(function SmeFinancing(props: MarketplaceTabsProps) {
  const list = props.data.filter((item) => item.section === "sme_financing");

  return (
    <EthivestTabContainer value="sme_financing">
      <Products data={list} />
    </EthivestTabContainer>
  );
});
