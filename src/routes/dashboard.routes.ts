import NotFound from "@/components/prompts/not-found";
import UnderConstruction from "@/components/prompts/under-construction";
import InvestmentVault from "@/features/investments/investment-vault";
import HomePage from "@/pages/home";
import InvestmentsPage from "@/pages/investments";
import BuyInvestmentProductPage from "@/pages/investments/buy-investment-product";
import InvestmentCategoriesPage from "@/pages/investments/investment-categories";
import InvestmentMarketplacePage from "@/pages/investments/investment-marketplace";
import InvestmentMarketplaceProductDetailsPage from "@/pages/investments/investment-marketplace-product-details";
import InvestmentProductDetailsPage from "@/pages/investments/investment-product-details";
import InvestmentVaultOverviewPage from "@/pages/investments/investment-vault/overview";
import InvestmentVaultTransactionsPage from "@/pages/investments/investment-vault/transactions";
import MyInvestmentsPage from "@/pages/my-investments";
import MyInvestmentCategoryPage from "@/pages/my-investments/my-investment-category"
import MyInvestmentTransactionPage from "@/pages/my-investments/transactions";
import SettingsPage from "@/pages/settings";
import SupportPage from "@/pages/support";
import FaqPage from "@/pages/support/faq";
import WalletPage from "@/pages/wallet/wallet-page";
import WalletTransactionsPage from "@/pages/wallet/wallet-transactions-page";
import { RouteProps } from "react-router-dom";

type CustomRouteProps = RouteProps & {};

const dashboardRoutes: CustomRouteProps[] = [
	{ path: "/home", Component: HomePage },
	{ path: "/wallet", Component: WalletPage },
	{ path: "/wallet/transactions", Component: WalletTransactionsPage },

	{ path: "/my-investments", Component: MyInvestmentsPage },
	{ path: "/my-investments/:categoryId/overview", Component: MyInvestmentCategoryPage },
	{path: "/my-investments/:categoryId/transactions", Component: MyInvestmentTransactionPage},


	{ path: "/savings", Component: UnderConstruction },

	{ path: "/investments", Component: InvestmentsPage },

	{ path: "/investments/vault", Component: InvestmentVault },
	{ path: "/investments/vault/overview", Component: InvestmentVaultOverviewPage },
	{ path: "/investments/vault/transactions", Component: InvestmentVaultTransactionsPage },

	{ path: "/investments/:categoryId", Component: InvestmentCategoriesPage },
	{ path: "/investments/:categoryId/products/:productId", Component: InvestmentProductDetailsPage },
	{ path: "/investments/:categoryId/products/:productId/buy", Component: BuyInvestmentProductPage },
	{ path: "/investments/:categoryId/products/:productId/marketplace", Component: InvestmentMarketplacePage },
	{path: "/investments/:categoryId/products/:productId/marketplace/:listingId", Component: InvestmentMarketplaceProductDetailsPage},

	{ path: "/investments/savings", Component: UnderConstruction },
	{ path: "/investments/savings/:id", Component: UnderConstruction },
	{ path: "/investments/savings/:id/buy", Component: UnderConstruction },

	{ path: "/support", Component: SupportPage },
	{ path: "/support/faq", Component: FaqPage },

	{ path: "/settings", Component: SettingsPage },
	{ path: "/notifications", Component: UnderConstruction },
	{ path: "*", Component: NotFound },
];

export default dashboardRoutes;
