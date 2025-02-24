import AppContainer from "@/components/container/container";
import useUi from "@/hooks/use-ui";
import Balance from "./my-investment-balance";
import MyInvestmentTabs from "./tabs";
import getMyActiveInvestments from "@/services/my-investments/get-my-active-investments";
import { useQuery } from "react-query";
import { useAppSelector } from "@/store/hooks";
import Render from "@/components/render";
import EmptyData from "@/components/empty-data";
import { assets } from "@/constants";

export default function MyInvestments() {
  useUi({ title: "My Investments" });

  const { currency } = useAppSelector((state) => state.account);

  const { isFetching, isError, error, data } = useQuery(
    ["active-Investments", currency.code],
    () => getMyActiveInvestments({ currency: currency.code }),
  );

  return (
    <AppContainer className="h-full space-y-10">
      <Render
        isLoading={isFetching}
        isError={isError}
        error={error}
        loadingPosition="center"
      >
        <Balance />
        {data && data?.length < 1 ? (
          <EmptyData
            icon={assets.empty_investment}
            title="No investment Found"
            text="You do not have any investment in your portfolio."
            className="[&_p]:!content-standard h-fit"
          />
        ) : (
          <MyInvestmentTabs data={data ?? []} />
        )}
      </Render>
    </AppContainer>
  );
}
