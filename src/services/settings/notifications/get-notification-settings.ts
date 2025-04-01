import { variables } from "@/constants";
import axios from "@/lib/axios";
import { NotificationSettings } from "@/types/notifications-settings.types";

type Response = NotificationSettings[];

type Parameters = {
  section: string;
};

export async function production(data: Parameters): Promise<Response> {
  const response = await axios.get(`/settings/notification-settings/${data}`);
  return response.data.data;
}

export async function development(): Promise<Response> {
  return new Promise((resolve) => {
    setTimeout(
      () =>
        resolve([
          {
            id: 1,
            user_id: 1,
            section: "email",
            notifications_from_admin: {
              news_and_updates: true,
              tips_and_tutorials: false,
            },
            login_notification: {
              notify_me: true,
            },
            wallet_threshold: {
              notify_me: false,
            },
            created_at: "2025-02-20T16:59:48.000000Z",
            updated_at: "2025-02-24T20:55:56.000000Z",
          },
          {
            id: 2,
            user_id: 1,
            section: "in-app",
            notifications_from_admin: {
              news_and_updates: true,
              tips_and_tutorials: false,
            },
            login_notification: {
              notify_me: true,
            },
            wallet_threshold: {
              notify_me: true,
            },
            created_at: "2025-02-20T16:59:48.000000Z",
            updated_at: "2025-02-20T16:59:48.000000Z",
          },
          {
            id: 3,
            user_id: 1,
            section: "push",
            notifications_from_admin: {
              news_and_updates: true,
              tips_and_tutorials: false,
            },
            login_notification: {
              notify_me: true,
            },
            wallet_threshold: {
              notify_me: true,
            },
            created_at: "2025-02-20T16:59:48.000000Z",
            updated_at: "2025-02-20T16:59:48.000000Z",
          },
        ]),
      2000,
    );
  });
}

export default async function getNotificationSettings(
  data: Parameters,
): Promise<Response> {
  if (variables.NODE_ENV === "development") return development();

  return production(data);
}
