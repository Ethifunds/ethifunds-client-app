export type NotificationSettingsSection = "email" | "in-app" | "push";

export type NotificationSettings = {
  id: number;
  user_id: number;
  section: NotificationSettingsSection;
  notifications_from_admin: {
    news_and_updates: boolean;
    tips_and_tutorials: boolean;
  };
  login_notification: {
    notify_me: boolean;
  };
  wallet_threshold: {
    notify_me: boolean;
  };
  created_at: string;
  updated_at: string;
};
