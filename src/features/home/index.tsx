import AppContainer from "@/components/container/container";
import { useAppSelector } from "@/store/hooks";
import WalletBalance from "../wallet/wallet-balance";
import Todos from "./todos";
import InvestmentOpportunity from "../investments/investment-opportunity";
import RecentTransactions from "../wallet/transactions/recent-transactions";

export default function Home() {
	const { account } = useAppSelector((state) => state.account);

	return (
		<AppContainer className="flex flex-col gap-10">
			<h1 className="heading-4 capitalize">Welcome {account.username}</h1>

			<WalletBalance />
			<Todos />
			<InvestmentOpportunity />
			<RecentTransactions />
		</AppContainer>
	);
}
