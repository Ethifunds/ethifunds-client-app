import { variables } from "@/constants";
import { savingsTransactions } from "@/constants/data/savings/savings-transactions";
import axios from "@/lib/axios";
import { SavingsTransaction } from "@/types/savings.types";

type Parameters = {
  cycle_id: number;
};

type Response = SavingsTransaction[];

export async function production(data: Parameters): Promise<Response> {
  const response = await axios.get(
    `/ethicoop/transactions/${data.cycle_id}?filter=recent`,
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
