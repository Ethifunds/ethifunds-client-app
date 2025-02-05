import AppContainer from "@/components/container/container";
import WalletBalance from "./wallet-balance";
import RecentTransactions from "./transactions/recent-transactions";
import useUi from "@/hooks/use-ui";

export default function Wallet() {
	useUi({ title: "Wallet" });
	return (
		<AppContainer className="space-y-5">
			<WalletBalance />
			<RecentTransactions />
		</AppContainer>
	);
}
