import { variables } from "@/constants";
import axios from "@/lib/axios";

type Response = boolean;

export async function production(): Promise<Response> {
  const response = await axios.get(`/investment/vault`);
  return response.data.data;
}

export async function development(): Promise<Response> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(false), 2000);
  });
}

export default async function getEthivestTerms(): Promise<Response> {
  if (variables.NODE_ENV === "development") return development();

  return production();
}
