import { variables } from "@/constants";
import { savingsTransactions } from "@/constants/data/savings/savings-transactions";
import axios from "@/lib/axios";
import buildQueryString from "@/lib/build-query-string";
import { SavingsTransaction } from "@/types/savings.types";

type Parameters = {
  currency: string;
};

type Response = SavingsTransaction[];

export async function production(data: Parameters): Promise<Response> {
  const query_string = buildQueryString(data);
  const response = await axios.get(
    `/account/recent-transactions?${query_string}`,
  );
  return response.data.data;
}

export async function development(): Promise<Response> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(savingsTransactions), 2000);
  });
}

export default async function getSavingsRecentTransactions(
  data: Parameters,
): Promise<Response> {
  if (variables.NODE_ENV === "development") return development();

  return production(data);
}
