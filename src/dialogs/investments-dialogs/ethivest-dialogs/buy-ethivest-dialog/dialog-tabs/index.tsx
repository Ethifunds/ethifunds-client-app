import * as React from "react";
import ProductDetails from "./product-details";
import BuyProduct from "./buy-product";
import { EthivestTabsProps } from "../use-buy-ethivest";

export default React.memo(function BuyTabs(props: EthivestTabsProps) {
  return (
    <React.Fragment>
      <ProductDetails {...props} />
      <BuyProduct {...props} />
    </React.Fragment>
  );
});
