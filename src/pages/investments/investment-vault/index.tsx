import InvestmentVault from "@/features/investments/investment-vault";
import useSeo from "@/hooks/use-seo";

export default function InvestmentsVaultPage() {
	useSeo({ pageTitle: "Investment Vault" });
	return <InvestmentVault />;
}
