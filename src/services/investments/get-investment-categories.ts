import { variables } from "@/constants";
import { investmentCategories } from "@/constants/data/investments/investment-categories";
import axios from "@/lib/axios";
import { InvestmentCategory } from "@/types/investments.types";

type Response = InvestmentCategory[];

export async function production(): Promise<Response> {
	const response = await axios.get(`/investment/product/categories`);
	return response.data.data;
}

export async function development(): Promise<Response> {
	return new Promise((resolve) => {
		setTimeout(() => resolve(investmentCategories), 2000);
	});
}

export default async function getInvestmentCategories(): Promise<Response> {
	if (variables.NODE_ENV === "development") return development();

	return production();
}
