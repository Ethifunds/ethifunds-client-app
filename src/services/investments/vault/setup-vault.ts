import { variables } from "@/constants";
import { vault } from "@/constants/data/vault";
import axios from "@/lib/axios";
import { InvestmentVault } from "@/types/investment-vault.types";

type Parameters = {
	currency: string;
};

type Response = InvestmentVault;

export async function production(data: Parameters): Promise<Response> {
	const response = await axios.post(`/investment/vault`, data);
	return response.data.data;
}

export async function development(): Promise<Response> {
	return new Promise((resolve) => {
		setTimeout(() => resolve(vault), 2000);
	});
}

export default async function setupVault(data: Parameters): Promise<Response> {
	if (variables.NODE_ENV === "development") return development();

	return production(data);
}
