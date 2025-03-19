import SavingsTransactions from "@/features/savings/overview/transactions";
import useSeo from "@/hooks/use-seo";

export default function SavingsTransactionsPage() {
  useSeo({ pageTitle: "Ethicoop - Transactions" });
  return <SavingsTransactions />;
}
