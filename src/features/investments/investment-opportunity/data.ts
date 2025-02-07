import { assets } from "@/constants";

export type OpportunityCard = {
	title: string;
	image: string;
	description: string;
	path: string;
	bg: string;
	bg_img: string;
	boarder: string;
};

export const opportunityList: OpportunityCard[] = [
	{
		title: "Investment Vault",
		image: assets.investment_vault,
		description:
			"The Ethifund Investment Vault is your secure digital vault for managing funds earmarked exclusively for investments. By separating your investment capital from your general wallet, you ensure your funds are safe and readily available for new opportunities.",
		path: "/investments/vault",
		bg: "bg-success",
		bg_img: assets.investment_vault_bg,
		boarder: "border-secondary",
	},
	{
		title: "Real Estate Investment",
		image: assets.real_estate_investment,
		description:
			"Diversify your portfolio with Ethifund’s Real Estate Investment Trust (REIT) opportunities. Invest in a carefully curated pool of real estate assets that generate income through rental collections and property sales with transparent returns, flexible buy-and-sell options, and potential for capital growth.",
		path: "/investments/real-estate",
		bg: "bg-secondary-200",
		bg_img: assets.real_estate_investment_bg,
		boarder: "border-secondary-600",
	},
	{
		title: "Savings Investment",
		image: assets.savings_investment,
		description:
			"Secure your financial future with Ethifunds' Savings Investment options. Our Shariah-compliant savings plans allow you to grow your wealth steadily, without the worry of interest-based returns. With flexible saving options and guaranteed security, managing your savings has never been easier.",
		path: "",
		bg: "bg-[#FDC2DF]",
		bg_img: assets.savings_investment_bg,
		boarder: "border-primary",
	},
];
