import { variables } from "@/constants";
import axios from "@/lib/axios";
import {
  SavingsCycle,
  SavingsFundingPreference,
  SavingsFundingSource,
} from "@/types/savings.types";

type Parameters = {
  cycle_id: SavingsCycle["id"];
  amount: number;
  contribution_date: string;
  funding_preference: SavingsFundingPreference;
  funding_source: SavingsFundingSource;
};

type Response = void;

export async function production(payload: Parameters): Promise<Response> {
  const response = await axios.post(`/ethicoop/subscribe`, payload);
  return response.data.data;
}

export async function development(): Promise<Response> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), 2000);
  });
}

export default async function initiateFundingCycle(data: Parameters): Promise<Response> {
  if (variables.NODE_ENV === "development") return development();

  return production(data);
}
