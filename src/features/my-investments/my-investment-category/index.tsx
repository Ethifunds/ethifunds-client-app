import AppContainer from "@/components/container/container";
import Render from "@/components/render";
import useCustomNavigation from "@/hooks/use-navigation";
import getMyInvestmentCategoryDetails from "@/services/my-investments/get-my-investment-category-details";
import { useQuery } from "react-query";
import Balance from "./balance";
import useUi from "@/hooks/use-ui";
import * as React from "react";
import RecentTransactions from "./transactions/recent-transactions";

export default function MyInvestmentCategory() {
  const { changeBackBtn } = useUi({ title: "My Investment" });
  const { params } = useCustomNavigation();

  const categoryId = params.categoryId ?? "";
  const { isFetching, isError, error, data } = useQuery(
    ["investment-category-details"],
    () => getMyInvestmentCategoryDetails({ categoryId }),
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
    <AppContainer className="h-full space-y-5 ">
      <Render
        isLoading={isFetching}
        isError={isError}
        error={error}
        loadingPosition="center"
      >
        {data && (
          <React.Fragment>
            <Balance
              category={data?.category}
              sum={data?.sum ?? 0}
              aggregate={data.investments.reduce(
                (acc, current) => acc + current.units_purchased,
                0,
              )}
            />

            <RecentTransactions data={data.recent_transactions} />
          </React.Fragment>
        )}
      </Render>
    </AppContainer>
  );
}
