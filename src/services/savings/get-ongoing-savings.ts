import { variables } from "@/constants";
import { savings } from "@/constants/data/savings/savings";
import axios from "@/lib/axios";
import { Savings } from "@/types/savings.types";

type Response = Savings[];

export async function production(): Promise<Response> {
  const response = await axios.get(`/ethicoop/ongoing`);
  return response.data.data;
}

export async function development(): Promise<Response> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(savings), 2000);
  });
}

export default async function getOngoingSavings(): Promise<Response> {
  if (variables.NODE_ENV === "development") return development();

  return production();
}
