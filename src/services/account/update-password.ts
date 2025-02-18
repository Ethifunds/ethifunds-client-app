import { variables } from "@/constants";
import axios from "@/lib/axios";

type Parameters = {
  current_password: string;
  new_password: string;
  confirm_password: string;
};

type Response = void;

export async function production(data: Parameters): Promise<Response> {
  const response = await axios.post(`/auth/login`, data);
  return response.data;
}

export async function development(): Promise<Response> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), 2000);
  });
}

export default async function updatePassword(
  data: Parameters,
): Promise<Response> {
  if (variables.NODE_ENV === "development") return development();

  return production(data);
}
