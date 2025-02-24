import * as React from "react";
import TabContainer from "../tab-container";
import List from "./list";
export default React.memo(function ListedInvestments() {
  return (
    <TabContainer value="listed_investments">
      <List />
    </TabContainer>
  );
});
