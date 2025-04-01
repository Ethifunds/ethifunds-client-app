import { variables } from "@/constants";
import { transactions } from "@/constants/data/transactions";
import { PaginatedResponse, PaginationQuery } from "@/types/global.types";
import axios from "@/lib/axios";
import paginate from "@/lib/paginate";
import { Transaction } from "@/types/transaction.type";

type Parameters = Partial<PaginationQuery> & {
  currency: string;
};

type Response = PaginatedResponse<Transaction>;

export async function production(data: Parameters): Promise<Response> {
  console.log(data.query_string);
  const response = await axios.get(
    `/account/transactions${data.query_string}`,
  );
  return paginate(response.data.data);
}

export async function development(): Promise<Response> {
	return new Promise((resolve) => {
		setTimeout(
			() =>
				resolve(
					paginate({
						current_page: 1,
						data: transactions,
						first_page_url: "http://127.0.0.1:8000/api/account/transactions?page=1",
						from: 1,
						last_page: 1,
						last_page_url: "http://127.0.0.1:8000/api/account/transactions?page=1",
						next_page_url: null,
						path: "http://127.0.0.1:8000/api/account/transactions",
						per_page: 20,
						prev_page_url: null,
						to: 2,
						total: 2,
					})
				),
			2000
		);
	});
}

export default async function getTransactions(data: Parameters): Promise<Response> {
	if (variables.NODE_ENV === "development") return development();

	return production(data);
}
