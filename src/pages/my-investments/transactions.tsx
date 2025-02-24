import MyInvestmentTransactions from "@/features/my-investments/my-investment-category/transactions";
import useSeo from "@/hooks/use-seo";

export default function MyInvestmentTransactionPage() {
  useSeo({ pageTitle: "My Investments Transactions" });

  return <MyInvestmentTransactions />;
}
