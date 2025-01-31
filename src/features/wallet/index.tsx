import AppContainer from "@/components/container/container";
import WalletBalance from "./wallet-balance";
import RecentTransactions from "./transactions/recent-transactions";

export default function Wallet() {
	return (
		<AppContainer className="space-y-5">
			<WalletBalance />
			<RecentTransactions />
		</AppContainer>
	);
}
