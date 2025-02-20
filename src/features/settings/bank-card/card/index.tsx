import * as React from "react";
import TabContainer from "../../tab-container";

export default React.memo(function Card() {
  return (
    <TabContainer
      value="card"
      title="Card"
      subTitle="Seamlessly manage your transactions by linking your bank cards to your Ethifunds Wallet"
      className="w-full py-0"
    >
      card
    </TabContainer>
  );
});
