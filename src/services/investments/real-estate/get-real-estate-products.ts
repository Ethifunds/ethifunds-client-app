import { variables } from "@/constants";
import { investmentCategories } from "@/constants/data/investments/investment-categories";
import { investmentProducts } from "@/constants/data/investments/investment-category-products";
import axios from "@/lib/axios";
import {
  InvestmentCategory,
  InvestmentProduct,
} from "@/types/investments.types";

type Parameters = {
  categoryId: string;
};

type Response = {
  category: InvestmentCategory;
  products: InvestmentProduct[];
};

export async function production({ categoryId }: Parameters): Promise<Response> {
	const response = await axios.get(`/investment/product/category/${categoryId}`);
	return response.data.data;
}

export async function development(): Promise<Response> {
	return new Promise((resolve) => {
		setTimeout(
			() =>
				resolve({
					category: investmentCategories[0],
					products: investmentProducts,
				}),
			2000
		);
	});
}

export default async function getRealEstateProducts(data: Parameters): Promise<Response> {
	if (variables.NODE_ENV === "development") return development();

	return production(data);
}
