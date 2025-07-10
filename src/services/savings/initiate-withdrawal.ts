import { variables } from "@/constants";
import axios from "@/lib/axios";
type Parameter = {
  amount: number;
};

type Response = void;

export async function production(data: Parameter): Promise<Response> {
  const response = await axios.post(`/ethicoop/wallet/withdraw`, data);
  return response.data.data;
}

export async function development(): Promise<Response> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), 2000);
  });
}

export default async function initiateWithdrawal(
  data: Parameter,
): Promise<Response> {
  if (variables.NODE_ENV === "development") return development();

  return production(data);
}
