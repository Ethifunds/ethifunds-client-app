import AppContainer from "@/components/container/container";
import { useAppSelector } from "@/store/hooks";
import WalletBalance from "../wallet/wallet-balance";
import Todos from "./todos";
import InvestmentOpportunity from "../investments/investment-opportunity";
import RecentTransactions from "../wallet/transactions/recent-transactions";
import useUi from "@/hooks/use-ui";

export default function Home() {
	const { account } = useAppSelector((state) => state.account);
	useUi({ title: `Welcome ${account.username}` });

	return (
		<AppContainer className="flex flex-col gap-10">		
			<WalletBalance />
			<Todos />
			<InvestmentOpportunity />
			<RecentTransactions />
		</AppContainer>
	);
}
