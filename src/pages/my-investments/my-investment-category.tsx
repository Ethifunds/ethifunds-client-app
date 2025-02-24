import MyInvestmentCategory from "@/features/my-investments/my-investment-category";
import useSeo from "@/hooks/use-seo";

export default function MyInvestmentCategoryPage() {
  useSeo({ pageTitle: "My Investments Category" });

  return <MyInvestmentCategory />;
}
