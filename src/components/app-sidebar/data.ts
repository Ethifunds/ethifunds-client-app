import * as icons from "./icons";
export type SidebarLink = {
	name: string;
	path: string;
	icon: string;
	activeIcon: string;
	relativePaths: string[];
};

export const sidebarLinks: SidebarLink[] = [
	{
		name: "home",
		path: "home",
		icon: icons.homeIcon,
		activeIcon: icons.homeIconActive,
		relativePaths: [],
	},
	{
		name: "wallet",
		path: "wallet",
		icon: icons.walletIcon,
		activeIcon: icons.walletIconActive,
		relativePaths: [],
	},
	{
		name: "my investments",
		path: "my-investments",
		icon: icons.myInvestmentsIcon,
		activeIcon: icons.myInvestmentsIconActive,
		relativePaths: [],
	},
	{
		name: "savings",
		path: "savings",
		icon: icons.savingsIcon,
		activeIcon: icons.savingsIconActive,
		relativePaths: [],
	},
	{
		name: "investments",
		path: "investments",
		icon: icons.investmentsIcon,
		activeIcon: icons.investmentsIconActive,
		relativePaths: [],
	},
	{
		name: "support",
		path: "support",
		icon: icons.supportIcon,
		activeIcon: icons.supportIconActive,
		relativePaths: [],
	},
	{
		name: "settings",
		path: "settings",
		icon: icons.settingsIcon,
		activeIcon: icons.settingsIconActive,
		relativePaths: [],
	},
];
