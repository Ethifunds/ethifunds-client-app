import { variables } from "@/constants";
import { savings } from "@/constants/data/savings/savings";
import axios from "@/lib/axios";
import { generateDigits } from "@/lib/generate-digits";
import { SavingsCycle } from "@/types/savings.types";

type Response = {
  balance: number | null;
  cycle: SavingsCycle;
};

export async function production(): Promise<Response> {
  const response = await axios.get(`/ethicoop/active-circle`);
  return response.data.data;
}

export async function development(): Promise<Response> {
  return new Promise((resolve) => {
    setTimeout(
      () =>
        resolve({
          balance: generateDigits(999),
          cycle: savings[0].ethicoop_cycle,
        }),
      2000,
    );
  });
}

export default async function getActiveCycle(): Promise<Response> {
  if (variables.NODE_ENV === "development") return development();

  return production();
}
