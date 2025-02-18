import { variables } from "@/constants";
import axios from "@/lib/axios";

type Parameters = {
  old_pin: string;
  new_pin: string;
};

type Response = void;

export async function production(data: Parameters): Promise<Response> {
  const response = await axios.post(`/auth/change-pin`, data);
  return response.data.data;
}

export async function development(): Promise<Response> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), 2000);
  });
}

export default async function changeTransactionPin(
  data: Parameters,
): Promise<Response> {
  if (variables.NODE_ENV === "development") return development();

  return production(data);
}
