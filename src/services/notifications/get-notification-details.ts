import { variables } from "@/constants";

import { notifications } from "@/constants/data/notifications";
import axios from "@/lib/axios";
import { Notification } from "@/types/notification.types";

type Parameters = {
  id: string;
};

type Response = Notification;

export async function production(data: Parameters): Promise<Response> {
  const response = await axios.get(`/notifications/${data.id}`);
  return response.data.data;
}

export async function development(data: Parameters): Promise<Response> {
  return new Promise((resolve) => {
    setTimeout(
      () =>
        resolve(
          notifications.find((item) => item.id === Number(data.id)) ??
            notifications[0],
        ),
      2000,
    );
  });
}

export default async function getNotificationDetails(
  data: Parameters,
): Promise<Response> {
  if (variables.NODE_ENV === "development") return development(data);

  return production(data);
}
