import { variables } from "@/constants";
import { transactions } from "@/constants/data/transactions";
import axios from "@/lib/axios";
import buildQueryString from "@/lib/build-query-string";
import { Transaction } from "@/types/transaction.type";

type Parameters = {
	currency: string;
};

type Response = Transaction[];

export async function production(data: Parameters): Promise<Response> {
	const query_string = buildQueryString(data);
	const response = await axios.get(`/account/recent-transactions?${query_string}`);
	return response.data.data;
}

export async function development(): Promise<Response> {
	return new Promise((resolve) => {
		setTimeout(() => resolve(transactions), 2000);
	});
}

export default async function getRecentTransactions(data: Parameters): Promise<Response> {
	if (variables.NODE_ENV === "development") return development();

	return production(data);
}
