import * as React from "react";
import EthivestTabContainer from "../ethivest-tab-container";
import { useQuery } from "react-query";
import getInvestmentCategoryDetails from "@/services/investments/get-investment-category-details";
import useCustomNavigation from "@/hooks/use-navigation";
import { InvestmentProduct } from "@/types/investments.types";
import { Tabs } from "@/components/ui/tabs";
import TabHeader from "./marketplace-tabs/tab-header";
import MarketplaceTabs from "./marketplace-tabs";
import Render from "@/components/render";

export default React.memo(function ExploreMarketplace() {
  const [list, setList] = React.useState<InvestmentProduct[]>([]);
  const { params } = useCustomNavigation();

  const categoryId = params.categoryId ?? "";

  const { isFetching, isError, error } = useQuery(
    ["ethivest-marketplace", categoryId],
    () => getInvestmentCategoryDetails({ categoryId }),
    {
      onSuccess(data) {
        setList(data.products);
      },
    },
  );

  return (
    <EthivestTabContainer value="marketplace">
      <Tabs defaultValue="all">
        <TabHeader />
        <Render isLoading={isFetching} isError={isError} error={error}>
          <MarketplaceTabs data={list} />
        </Render>
      </Tabs>
    </EthivestTabContainer>
  );
});
