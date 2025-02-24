import MyInvestments from "@/features/my-investments";
import useSeo from "@/hooks/use-seo";

export default function MyInvestmentsPage() {
  useSeo({ pageTitle: "My Investments" });
  return <MyInvestments />;
}
