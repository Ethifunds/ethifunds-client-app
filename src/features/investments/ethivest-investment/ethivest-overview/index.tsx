import * as React from "react";
import Balance from "./balance";
import EthivestTabs from "./ethivest-tabs";
import AppContainer from "@/components/container/container";

export default React.memo(function EthivestOverview() {
  return (
    <AppContainer className="space-y-5">
      <Balance />
      <EthivestTabs />
    </AppContainer>
  );
});
