import Render from "@/components/render";
import useRecentTransactions from "./use-recent-transactions";
import TransactionTable from "../transaction-table";
import { Link } from "react-router-dom";
import ErrorBoundary from "@/components/error-boundary";

export default function RecentTransactions() {
  const { isFetching, isError, error, data, sign } = useRecentTransactions();

  return (
    <div className="space-y-5">
      <ErrorBoundary>
        <div className="flex items-center justify-between px-1">
          <h1 className="highlight-accent text-neutral-1000">
            Recent Transactions{" "}
          </h1>
          {data && data?.length > 0 && (
            <Link
              to={"/wallet/transactions"}
              className="text-primary underline"
            >
              View All
            </Link>
          )}
        </div>

        <div className="h-full max-h-96 min-h-60 overflow-auto">
          <Render isLoading={isFetching} isError={isError} error={error}>
            <TransactionTable
              data={data ?? []}
              isEmpty={!data?.length}
              sign={sign}
            />
          </Render>
        </div>
      </ErrorBoundary>
    </div>
  );
}
