export type TabsValues =
  | "profile"
  | "security"
  | "documents"
  | "card_bank"
  | "card"
  | "bank"
  | "notifications"
  | "change_password"
  | "security_questions"
  | "transaction_pin"
  | "2fa"
  | "default"
  | "security_questions"
  | "email"
  | "in-app"
  | "push";

export type SettingsTab = {
  title: string;
  value: TabsValues;
};

export const settingsTab: SettingsTab[] = [
  {
    title: "profile",
    value: "profile",
  },
  {
    title: "security",
    value: "security",
  },
  {
    title: "documents",
    value: "documents",
  },
  {
    title: "card & bank",
    value: "card_bank",
  },
  {
    title: "notifications",
    value: "notifications",
  },
];
