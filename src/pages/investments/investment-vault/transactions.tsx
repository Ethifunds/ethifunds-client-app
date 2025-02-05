import VaultTransactions from "@/features/investments/investment-vault/overview/transactions";
import useSeo from "@/hooks/use-seo";

export default function InvestmentVaultTransactionsPage() {
	useSeo({ pageTitle: "Investment Vault Transactions" });
	return <VaultTransactions />;
}
