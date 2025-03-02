import { variables } from "@/constants";
import { activeInvestments } from "@/constants/data/investments/active-investments";
import axios from "@/lib/axios";
import { ActiveInvestmentInvestments } from "@/types/my-investments.types";

type Parameters = {
  currency: string;
};

type Response = ActiveInvestmentInvestments[];

export async function production(data: Parameters): Promise<Response> {
  const response = await axios.get(
    `/my-investment/active-investments?currency=${data.currency}`,
  );
  return response.data.data;
}

export async function development(): Promise<Response> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(activeInvestments), 2000);
  });
}

export default async function getActiveInvestments(
  data: Parameters,
): Promise<Response> {
  if (variables.NODE_ENV === "development") return development();

  return production(data);
}
