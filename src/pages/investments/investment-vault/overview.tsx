import InvestmentVaultOverview from "@/features/investments/investment-vault/overview";
import useSeo from "@/hooks/use-seo";

export default function InvestmentVaultOverviewPage() {
	useSeo({ pageTitle: "Investment Vault Overview" });
	return <InvestmentVaultOverview />;
}
