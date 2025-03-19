import SavingsOverview from "@/features/savings/overview";
import useSeo from "@/hooks/use-seo";

export default function SavingsOverviewPage() {
  useSeo({ pageTitle: "Ethicoop - Overview" });

  return <SavingsOverview />;
}
