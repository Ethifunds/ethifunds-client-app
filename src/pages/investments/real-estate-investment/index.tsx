import RealEstateInvestment from "@/features/investments/real-estate-investment";
import useSeo from "@/hooks/use-seo";

export default function RealEstateInvestmentPage() {
	useSeo({ pageTitle: "REITs" });

	return <RealEstateInvestment />;
}
