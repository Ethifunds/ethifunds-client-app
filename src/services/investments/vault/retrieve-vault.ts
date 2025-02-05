import { variables } from "@/constants";
import { vault, vaultTransactions } from "@/constants/data/vault";
import axios from "@/lib/axios";
import buildQueryString from "@/lib/build-query-string";
import { InvestmentVault, InvestmentVaultTransaction } from "@/types/investment-vault.types";

type Parameters = {
	currency: string;
};

type Response = {
	vault: InvestmentVault;
	recent_transactions: InvestmentVaultTransaction[];
} | null;

export async function production(data: Parameters): Promise<Response> {
	const query_string = buildQueryString(data);
	const response = await axios.get(`/investment/vault?${query_string}`);
	return response.data.data;
}

export async function development(): Promise<Response> {
	return new Promise((resolve) => {
		setTimeout(
			() =>
				resolve({
					vault: vault,
					recent_transactions: vaultTransactions,
				}),
			2000
		);
	});
}

export default async function retrieveVault(data: Parameters): Promise<Response> {
	if (variables.NODE_ENV === "development") return development();

	return production(data);
}
