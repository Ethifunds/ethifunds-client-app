import * as React from "react";
import EthivestTabContainer from "../../ethivest-tab-container";
import { MarketplaceTabsProps } from ".";
import Products from "../products";

export default React.memo(function LpoFinancing(props: MarketplaceTabsProps) {
  const list = props.data.filter((item) => item.section === "lpo_financing");

  return (
    <EthivestTabContainer value="lpo_financing">
      <Products data={list} />
    </EthivestTabContainer>
  );
});
