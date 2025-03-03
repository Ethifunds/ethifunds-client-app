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
	
];
