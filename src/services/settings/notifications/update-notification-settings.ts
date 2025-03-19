import { variables } from "@/constants";
import axios from "@/lib/axios";
import { NotificationSettings } from "@/types/notifications-settings.types";

type Parameters = Pick<
  NotificationSettings,
  | "notifications_from_admin"
  | "login_notification"
  | "wallet_threshold"
  | "section"
>;
type Response = void;

export async function production(data: Parameters): Promise<Response> {
  const response = await axios.post(`/settings/notification-settings`, data);
  return response.data.data;
}

export async function development(): Promise<Response> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), 2000);
  });
}

export default async function updateNotificationSettings(
  data: Parameters,
): Promise<Response> {
  if (variables.NODE_ENV === "development") return development();

  return production(data);
}
