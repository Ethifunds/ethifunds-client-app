import { variables } from "@/constants";
import { transactions } from "@/constants/data/transactions";
import axios from "@/lib/axios";
import buildQueryString from "@/lib/build-query-string";
import { Transaction } from "@/types/transaction.type";

type Parameters = {
	id: string;
	currency: string;
};

type Response = Transaction;

export async function production({ id, ...data }: Parameters): Promise<Response> {
	const query_string = buildQueryString(data);
	const response = await axios.get(`/account/recent-transactions/${id}?${query_string}`);
	return response.data.data;
}

export async function development(): Promise<Response> {
	return new Promise((resolve) => {
		setTimeout(() => resolve(transactions[0]), 2000);
	});
}

export default async function getTransactionDetails(data: Parameters): Promise<Response> {
	if (variables.NODE_ENV === "development") return development();

	return production(data);
}
