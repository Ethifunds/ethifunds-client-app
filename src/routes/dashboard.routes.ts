import NotFound from "@/components/prompts/not-found";
import UnderConstruction from "@/components/prompts/under-construction";
import InvestmentVault from "@/features/investments/investment-vault";
import HomePage from "@/pages/home";
import InvestmentsPage from "@/pages/investments";
import InvestmentVaultOverviewPage from "@/pages/investments/investment-vault/overview";
import InvestmentVaultTransactionsPage from "@/pages/investments/investment-vault/transactions";
import RealEstateInvestmentPage from "@/pages/investments/real-estate-investment";
import SettingsPage from "@/pages/settings";
import WalletPage from "@/pages/wallet/wallet-page";
import WalletTransactionsPage from "@/pages/wallet/wallet-transactions-page";
import { RouteProps } from "react-router-dom";

type CustomRouteProps = RouteProps & {};

const dashboardRoutes: CustomRouteProps[] = [
	{ path: "/home", Component: HomePage },
	{ path: "/wallet", Component: WalletPage },
	{ path: "/wallet/transactions", Component: WalletTransactionsPage },
	{ path: "/my-investments", Component: UnderConstruction },
	{ path: "/savings", Component: UnderConstruction },

	{ path: "/investments", Component: InvestmentsPage },

	{ path: "/investments/vault", Component: InvestmentVault },
	{ path: "/investments/vault/overview", Component: InvestmentVaultOverviewPage },
	{ path: "/investments/vault/transactions", Component: InvestmentVaultTransactionsPage },

	{ path: "/investments/real-estate", Component: RealEstateInvestmentPage },
	{ path: "/investments/real-estate/:id", Component: UnderConstruction },
	{ path: "/investments/real-estate/:id/buy", Component: UnderConstruction },

	{ path: "/investments/savings", Component: UnderConstruction },
	{ path: "/investments/savings/:id", Component: UnderConstruction },
	{ path: "/investments/savings/:id/buy", Component: UnderConstruction },

	{ path: "/support", Component: UnderConstruction },
	{ path: "/settings", Component: SettingsPage },
	{ path: "/notifications", Component: UnderConstruction },
	{ path: "*", Component: NotFound },
];

export default dashboardRoutes;
