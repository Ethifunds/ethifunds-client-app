import { variables } from "@/constants";
import axios from "@/lib/axios";
import { generateDigits } from "@/lib/generate-digits";
import { SavingsPreference } from "@/types/savings.types";

type Response = SavingsPreference;

export async function production(): Promise<Response> {
  const response = await axios.get(`/ethicoop/recurring`);
  return response.data.data;
}

export async function development(): Promise<Response> {
  return new Promise((resolve) => {
    setTimeout(
      () =>
        resolve({
          id: generateDigits(999),
          user_id: generateDigits(999),
          amount: generateDigits(999),
          funding_source: "wallet",
          debit_day: generateDigits(9),
          next_run_at: new Date().toISOString(),
          last_run_at: null,
          failure_count: 0,
          status: "active",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }),
      2000,
    );
  });
}

export default async function getSavingsPreference(): Promise<Response> {
  if (variables.NODE_ENV === "development") return development();

  return production();
}
