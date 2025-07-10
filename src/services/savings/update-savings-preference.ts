import { variables } from "@/constants";
import axios from "@/lib/axios";
import { UpdateSavingsPreference } from "@/types/savings.types";

type Parameters = Partial<UpdateSavingsPreference>;

type Response = void;

export async function production(payload: Parameters): Promise<Response> {
  const response = await axios.post(`/ethicoop/recurring`, payload);
  return response.data.data;
}

export async function development(): Promise<Response> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), 2000);
  });
}

export default async function updateSavingsPreference(
  data: Parameters,
): Promise<Response> {
  if (variables.NODE_ENV === "development") return development();

  return production(data);
}
