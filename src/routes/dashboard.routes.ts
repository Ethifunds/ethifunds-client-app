import NotFound from "@/components/prompts/not-found";
import UnderConstruction from "@/components/prompts/under-construction";
import InvestmentVault from "@/features/investments/investment-vault";
import HomePage from "@/pages/home";
import InvestmentsPage from "@/pages/investments";
import BuyInvestmentProductPage from "@/pages/investments/buy-investment-product";
import InvestmentCategoriesPage from "@/pages/investments/investment-categories";
import InvestmentProductDetailsPage from "@/pages/investments/investment-product-details";
import InvestmentVaultOverviewPage from "@/pages/investments/investment-vault/overview";
import InvestmentVaultTransactionsPage from "@/pages/investments/investment-vault/transactions";
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

	{ path: "/investments/:categoryId", Component: InvestmentCategoriesPage },
	{ path: "/investments/:categoryId/products/:productId", Component: InvestmentProductDetailsPage },
	{ path: "/investments/:categoryId/products/:productId/buy", Component: BuyInvestmentProductPage },

	{ path: "/investments/savings", Component: UnderConstruction },
	{ path: "/investments/savings/:id", Component: UnderConstruction },
	{ path: "/investments/savings/:id/buy", Component: UnderConstruction },

	{ path: "/support", Component: UnderConstruction },
	{ path: "/settings", Component: SettingsPage },
	{ path: "/notifications", Component: UnderConstruction },
	{ path: "*", Component: NotFound },
];

export default dashboardRoutes;
