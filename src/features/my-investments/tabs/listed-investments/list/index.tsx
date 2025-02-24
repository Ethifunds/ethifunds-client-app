import EmptyData from "@/components/empty-data";
import ErrorBoundary from "@/components/error-boundary";
import Render from "@/components/render";
import { assets } from "@/constants";
import useCustomNavigation from "@/hooks/use-navigation";
import getMyListedInvestments from "@/services/my-investments/get-my-listed-investments";
import { useQuery } from "react-query";
import ListCard from "./list-card";
import { useAppSelector } from "@/store/hooks";
import * as React from "react";

export default function List() {
  const { currency } = useAppSelector((state) => state.account);
  const { queryParams } = useCustomNavigation();
  const hasAction = queryParams.has("action");

  const { isFetching, isError, error, data } = useQuery(
    ["my-listed-investments"],
    () => getMyListedInvestments(),
    {
      enabled: !hasAction && true,
    },
  );

  React.useLayoutEffect(() => {
    queryParams.delete("action");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <ErrorBoundary>
      <Render isLoading={isFetching} isError={isError} error={error}>
        {data && data.length < 1 ? (
          <EmptyData
            title="No listed Investments yet"
            icon={assets.empty_01}
            text="You don't have any investment listed yet. All your listed investment will appear here."
          />
        ) : (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 2xl:grid-cols-3">
            {data?.map((item) => (
              <ListCard key={item.id} {...item} sign={currency.sign} />
            ))}
          </div>
        )}
      </Render>
    </ErrorBoundary>
  );
}
