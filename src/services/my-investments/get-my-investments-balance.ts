import { variables } from "@/constants";
import axios from "@/lib/axios";
import { generateDigits } from "@/lib/generate-digits";

type Parameters = {
  currency: string;
};

type Response = number;

export async function production(data: Parameters): Promise<Response> {
  const response = await axios.get(
    `/my-investment/balance?currency=${data.currency}`,
  );
  return response.data.data;
}

export async function development(): Promise<Response> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(generateDigits(9999)), 2000);
  });
}

export default async function getMyInvestmentsBalance(
  data: Parameters,
): Promise<Response> {
  if (variables.NODE_ENV === "development") return development();

  return production(data);
}
