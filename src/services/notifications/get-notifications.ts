import { variables } from "@/constants";

import { notifications } from "@/constants/data/notifications";
import axios from "@/lib/axios";
import { Notification } from "@/types/notification.types";

type Parameters = Partial<{
  page: number;
}>;

type Response = Notification[];

export async function production({ page = 1 }: Parameters): Promise<Response> {
  const response = await axios.get(`/notifications?page=${page}`);
  return response.data.data;
}

export async function development(): Promise<Response> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(notifications), 2000);
  });
}

export default async function getNotifications(
  data: Parameters,
): Promise<Response> {
  if (variables.NODE_ENV === "development") return development();

  return production(data);
}
