import WalletTransactions from "@/features/wallet/transactions";
import useSeo from "@/hooks/use-seo";

export default function WalletTransactionsPage() {
	useSeo({ pageTitle: "Wallet Transactions" });
	return <WalletTransactions />;
}
