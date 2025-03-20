export const NotificationTypes = [
  "SYSTEM",
  "PROMOTIONAL",
  "ACCOUNT",
  "TRANSACTIONS",
  "INVESTMENT_OFFERS",
  "INVESTMENT_TRANSACTIONS",
] as const;

export type NotificationType = (typeof NotificationTypes)[number];

export type NotificationDataTypes = "user_savings" | "product" | "listing" | "user_investment";

export type Notification = {
  id: number;
  data: NotificationData;
  read_at: string | null;
  created_at: string; 
  updated_at: string;
};

export type NotificationData = Partial<Record<NotificationDataTypes, any>> & {
  message: string;
  type: NotificationType;
};
