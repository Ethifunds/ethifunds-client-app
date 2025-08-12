import InvestmentTable from "../investment-table";
// import { Link } from "react-router-dom";
import ErrorBoundary from "@/components/error-boundary";
import { MyActiveInvestment } from "@/types/my-investments.types";
import { useAppSelector } from "@/store/hooks";

type RecentTransactionsProps = {
  data: MyActiveInvestment["investments"];
};
export default function RecentInvestments(props: RecentTransactionsProps) {
  const { currency } = useAppSelector((state) => state.account);

  const data = props.data;
  const sign = currency.sign;

  return (
    <div className="space-y-5">
      <ErrorBoundary>
        <div className="flex justify-between items-center px-1">
          <h1 className="highlight-accent text-neutral-1000">
            Recent Investments{" "}
          </h1>
          {/* {data && data?.length > 0 && (
            <Link
              to={`/my-investments/${categoryId}/transactions`}
              className="underline text-primary"
            >
              View All
            </Link>
          )} */}
        </div>

        <div className="overflow-auto h-full max-h-96 min-h-60">
          <InvestmentTable
            data={data ?? []}
            isEmpty={!data?.length}
            sign={sign}
          />
        </div>
      </ErrorBoundary>
    </div>
  );
}
