import { variables } from "@/constants";
import { savingsTransactions } from "@/constants/data/savings/savings-transactions";
import axios from "@/lib/axios";
import { SavingsTransaction } from "@/types/savings.types";

type Parameters = {
  id: string;
};

type Response = SavingsTransaction;

export async function production({ id }: Parameters): Promise<Response> {
  const response = await axios.get(`/account/recent-transactions/${id}`);
  return response.data.data;
}

export async function development(): Promise<Response> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(savingsTransactions[0]), 2000);
  });
}

export default async function getSavingsTransactionDetails(
  data: Parameters,
): Promise<Response> {
  if (variables.NODE_ENV === "development") return development();

  return production(data);
}
