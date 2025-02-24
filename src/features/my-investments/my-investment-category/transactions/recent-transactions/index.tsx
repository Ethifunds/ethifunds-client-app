import TransactionTable from "../transaction-table";
import { Link } from "react-router-dom";
import ErrorBoundary from "@/components/error-boundary";
import { MyInvestmentTransactions } from "@/types/my-investments.types";
import { useAppSelector } from "@/store/hooks";
import useCustomNavigation from "@/hooks/use-navigation";

type RecentTransactionsProps = {
  data: MyInvestmentTransactions[];
};
export default function RecentTransactions(props: RecentTransactionsProps) {
  const { currency } = useAppSelector((state) => state.account);
  const { params } = useCustomNavigation();

  const categoryId = params.categoryId;

  const data = props.data;
  const sign = currency.sign;

  return (
    <div className="space-y-5">
      <ErrorBoundary>
        <div className="flex items-center justify-between px-1">
          <h1 className="highlight-accent text-neutral-1000">
            Recent Transactions{" "}
          </h1>
          {data && data?.length > 0 && (
            <Link
              to={`/my-investments/${categoryId}/transactions`}
              className="text-primary underline"
            >
              View All
            </Link>
          )}
        </div>

        <div className="h-full max-h-96 min-h-60 overflow-auto">
          <TransactionTable
            data={data ?? []}
            isEmpty={!data?.length}
            sign={sign}
          />
        </div>
      </ErrorBoundary>
    </div>
  );
}
