import { variables } from "@/constants";
import { bankAccounts } from "@/constants/data/bank-accounts";
import axios from "@/lib/axios";
import buildQueryString from "@/lib/build-query-string";
import { BankAccount } from "@/types/bank-account.types";

type Parameters = {
	currency?: string;
};

type Response = BankAccount[];

export async function production(data: Parameters): Promise<Response> {
	const query_string = buildQueryString(data);
	const response = await axios.get(`/settings/bank-accounts?${query_string}`);
	return response.data.data;
}

export async function development(): Promise<Response> {
	return new Promise((resolve) => {
		setTimeout(() => resolve(bankAccounts), 2000);
	});
}

export default async function getUserAccounts(data: Parameters): Promise<Response> {
	if (variables.NODE_ENV === "development") return development();

	return production(data);
}
