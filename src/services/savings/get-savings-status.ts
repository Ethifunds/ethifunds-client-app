import { variables } from "@/constants";
import axios from "@/lib/axios";


type Response = boolean;

export async function production(): Promise<Response> {
  const response = await axios.get(`/ethicoop/consent/data`);
  return response.data.data.consent_data.agreed;
}

export async function development(): Promise<Response> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(true), 2000);
  });
}

export default async function getSavingsStatus(): Promise<Response> {
  if (variables.NODE_ENV === "development") return development();

  return production();
}
