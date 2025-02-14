import { InvestmentCategory } from "@/types/investments.types";

export const investmentCategories: InvestmentCategory[] = [
	{
		id: 1,
		name: "Real Estate Investment",
		display_image:
			"https://res.cloudinary.com/dtfbkxzmc/image/upload/v1738885847/Buy_House_yesqry.png",
		description:
			"Diversify your portfolio with Ethifund’s Real Estate Investment Trust (REIT) opportunities. Invest in a carefully curated pool of real estate assets that generate income through rental collections and property sales with transparent returns, flexible buy-and-sell options, and potential for capital growth.",
		display_title: "Real Estate Investment",
		type: "unitized",
		status: "active",
		created_at: null,
		updated_at: null,
	},
	{
		id: 2,
		name: "Ethivest Investment",
		display_image:
			"https://res.cloudinary.com/dtfbkxzmc/image/upload/v1738885847/Buy_House-2_ejinwy.png",
		description:
			"Secure your financial future with ethifund’s Savings Investment options. Our Shariah-compliant savings plans allow you to grow your wealth steadily, without the worry of interest-based returns. With flexible saving options and guaranteed security, managing your savings has never been easier.",
		display_title: "Growth Funds",
		type: "fixed-tenor",
		status: "active",
		created_at: null,
		updated_at: null,
	},
];
