import { variables } from "@/constants";
import axios from "@/lib/axios";
import { generateDigits } from "@/lib/generate-digits";

type Response = number | null;

export async function production(): Promise<Response> {
  const response = await axios.get(`/ethicoop/balance`);
  return response.data.data;
}

export async function development(): Promise<Response> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(generateDigits(9999)), 2000);
  });
}

export default async function getSavingsBalance(): Promise<Response> {
  if (variables.NODE_ENV === "development") return development();

  return production();
}
