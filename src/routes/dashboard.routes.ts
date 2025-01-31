import UnderConstruction from "@/components/prompts/under-construction";
import HomePage from "@/pages/home";
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
	{ path: "/investments", Component: UnderConstruction },
	{ path: "/support", Component: UnderConstruction },
	{ path: "/settings", Component: UnderConstruction },
	{ path: "/notifications", Component: UnderConstruction },
];

export default dashboardRoutes;
