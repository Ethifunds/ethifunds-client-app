import TransactionTable from "../transaction-table";
import { Link } from "react-router-dom";
import ErrorBoundary from "@/components/error-boundary";
import { InvestmentVaultTransaction } from "@/types/investment-vault.types";
import { useAppSelector } from "@/store/hooks";

type RecentTransactionsProps = {
	data: InvestmentVaultTransaction[];
};

export default function RecentTransactions(props: RecentTransactionsProps) {
	const { currency } = useAppSelector((state) => state.account);
	return (
    <div className="space-y-5">
      <ErrorBoundary>
        <div className="flex items-center justify-between px-1">
          <h1 className="highlight-accent text-neutral-1000">
            Recent Transactions{" "}
          </h1>
          {props.data.length > 0 && (
            <Link
              to={"/investments/vault/transactions"}
              className="text-primary underline"
            >
              View All
            </Link>
          )}
        </div>

        <div className="h-full max-h-96 min-h-60 overflow-auto">
          <TransactionTable
            data={props.data}
            isEmpty={!props.data?.length}
            sign={currency.code}
          />
        </div>
      </ErrorBoundary>
    </div>
  );
}
