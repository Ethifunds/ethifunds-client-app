import Render from "@/components/render";
import useRecentTransactions from "./use-recent-transactions";
import TransactionTable from "../transaction-table";
import { Link } from "react-router-dom";
import TransactionFilters from "../transaction-table/transaction-filters";
import ErrorBoundary from "@/components/error-boundary";

export default function RecentTransactions() {
	const { isFetching, isError, error, data, sign } = useRecentTransactions();

	return (
		<div className="space-y-5 ">
			<ErrorBoundary>
				<div className="flex justify-between items-center px-1">
					<h1 className="highlight-accent text-neutral-1000">Recent Transactions </h1>
					<Link to={"/wallet/transactions"} className="underline text-primary">
						View All
					</Link>
				</div>

				{/* <div className="overflow-auto"> */}

				<TransactionFilters disabled={isFetching} />
				{/* </div> */}
				<div className="h-full min-h-60 max-h-96 overflow-auto">
					<Render isLoading={isFetching} isError={isError} error={error}>
						<TransactionTable data={data ?? []} isEmpty={!data?.length} sign={sign} />
					</Render>
				</div>
			</ErrorBoundary>
		</div>
	);
}
