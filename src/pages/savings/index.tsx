import Savings from "@/features/savings";
import useSeo from "@/hooks/use-seo";

export default function SavingsPage() {
  useSeo({ pageTitle: "Savings" });
  return <Savings />;
}
