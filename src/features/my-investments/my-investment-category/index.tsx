import AppContainer from "@/components/container/container";
import Render from "@/components/render";
import useCustomNavigation from "@/hooks/use-navigation";
import getMyInvestmentCategoryDetails from "@/services/my-investments/get-my-investment-category-details";
import { useQuery } from "react-query";
import Balance from "./balance";
import useUi from "@/hooks/use-ui";
import * as React from "react";
import RecentTransactions from "./transactions/recent-transactions";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RecentInvestments from "./investments/recent-investments";
const tabsList = [
  {
    title: "Investments",
    value: "investments",
  },
  {
    title: "Transactions",
    value: "transactions",
  },
];

export default function MyInvestmentCategory() {
  const { changeBackBtn } = useUi({ title: "My Investment" });
  const { params, queryParams } = useCustomNavigation();

  const categoryId = params.categoryId ?? "";
  const hasAction = React.useMemo(
    () => queryParams.has("sale_option"),
    [queryParams],
  );

  const { isFetching, isError, error, data } = useQuery(
    ["investment-category-details"],
    () => getMyInvestmentCategoryDetails({ categoryId }),
    {
      enabled: !hasAction && true,
    },
  );

  React.useLayoutEffect(() => {
    changeBackBtn({
      show: true,
      path: "/my-investments",
    });

    return () => {
      changeBackBtn(null);
    };
  });

  return (
    <AppContainer className="space-y-5 h-full">
      <Render
        isLoading={isFetching}
        isError={isError}
        error={error}
        loadingPosition="center"
      >
        {data && (
          <Balance
            category={data?.category}
            sum={data?.sum ?? 0}
            aggregate={data.investments.reduce(
              (acc, current) =>
                acc + (current.units_purchased - (current.units_sold ?? 0)),
              0,
            )}
          />
        )}
        <Tabs defaultValue={"investments"} className="!p-0 outline-none space-y-10">
          <TabsList className="hide-scrollbar w-full justify-start gap-2 overflow-x-auto overflow-y-hidden rounded-none border-b-2 bg-transparent !p-0 !pb-3 lg:gap-5 lg:border-b">
            {tabsList.map((item, idx) => {
              return (
                <TabsTrigger
                  key={idx}
                  value={item.value}
                  // onClick={() => click(item.value)}
                  className="content-standard hover:content-bold data-[state=active]:content-bold justify-start !rounded-none border-b-2 border-transparent !bg-transparent px-2 py-4 capitalize text-neutral-500 !shadow-none first:pl-0 hover:border-primary hover:text-primary data-[state=active]:border-primary data-[state=active]:!text-primary"
                >
                  {item.title}
                </TabsTrigger>
              );
            })}
          </TabsList>

          <TabsContent value="transactions">
            <RecentTransactions data={data?.recent_transactions ?? []} />
          </TabsContent>
          <TabsContent value="investments">
            <RecentInvestments data={data?.investments ?? []} />
          </TabsContent>
        </Tabs>
      </Render>
    </AppContainer>
  );
}
