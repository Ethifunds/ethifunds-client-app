import { variables } from "@/constants";
import { users } from "@/constants/data/users";
import axios from "@/lib/axios";
import { User } from "@/types/user.types";

type Parameters = {
  id: string;
};

type Response = User;

export async function production(data: Parameters): Promise<Response> {
  const response = await axios.get(`/users/${data.id}`);
  return response.data.data;
}

export async function development(): Promise<Response> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(users[0]), 2000);
  });
}

export default async function getUserById(data: Parameters): Promise<Response> {
  if (variables.NODE_ENV === "development") return development();

  return production(data);
}
