export type Features =
  | "wallet"
  | "my investments"
  | "investments"
  | "investment vault"
  | "savings"
  | "support"
  | "settings"
  | "profile"
  | "security"
  | "change password"
  | "security questions"
  | "change pin"
  | "2fa"
  | "upload documents"
  | "saved cards"
  | "bank accounts"
  | "notification settings";

export type FeatureList = {
  id: number;
  name: Features;
  path: string;
  tags?: string[];
};

export const featureList: FeatureList[] = [
  {
    id: 1,
    name: "wallet",
    path: "/wallet",
    tags: [
      "account wallet",
      "wallets",
      "ethifunds wallets",
      "fund wallet",
      "withdrawal",
      "withdraw",
    ],
  },
  {
    id: 2,
    name: "my investments",
    path: "/my-investments",
    tags: ["active investments"],
  },
  {
    id: 3,
    name: "investments",
    path: "/investments",
    tags: [
      "new investments",
      "opportunities",
      "invest",
      "reit",
      "reits",
      "ethivest",
      "crowd funding",
      "marketplace",
    ],
  },
  {
    id: 4,
    name: "investment vault",
    path: "/investments/vault",
    tags: ["vault", "fund vault", "my vault", "account vault"],
  },
  {
    id: 5,
    name: "savings",
    path: "/savings",
    tags: ["ethicoop", "sharia savings", "cooperative", "co operative"],
  },
  {
    id: 6,
    name: "support",
    path: "/support",
    tags: ["report", "feedback", "customer care"],
  },
  {
    id: 7,
    name: "settings",
    path: "/settings",
    tags: ["account settings", "my settings", "app settings"],
  },
  {
    id: 8,
    name: "profile",
    path: "/settings?tab=profile",
    tags: [
      "profile settings",
      "my profile",
      "update profile",
      "user profile",
      "verify",
      "verify account",
      "bvn",
      "user account",
      "settings",
    ],
  },
  {
    id: 9,
    name: "security",
    path: "/settings?tab=security",
    tags: ["security", "account security", "security settings", "settings"],
  },
  {
    id: 10,
    name: "change password",
    path: "/settings?tab=security&sub_tab=change_password",
    tags: [
      "update password",
      "password",
      "reset password",
      "user password",
      "account password",
      "new password",
      "settings",
    ],
  },
  {
    id: 11,
    name: "security questions",
    path: "/settings?tab=security&sub_tab=security_questions",
    tags: [
      "security question",
      "update security questions",
      "questions",
      "account questions",
      "reset account questions",
      "settings",
    ],
  },
  {
    id: 12,
    name: "change pin",
    path: "/settings?tab=security&sub_tab=transaction_pin",
    tags: [
      "transaction pin",
      "update pin",
      "pin",
      "reset pin",
      "set pin",
      "settings",
    ],
  },
  {
    id: 13,
    name: "2fa",
    path: "/settings?tab=security&sub_tab=2fa",
    tags: [
      "enable 2fa",
      "two factor authentication",
      "two factor auth",
      "2 factor auth",
      "settings",
    ],
  },
  {
    id: 14,
    name: "upload documents",
    path: "/settings?tab=documents",
    tags: [
      "upload",
      "documents",
      "utility",
      "account verification",
      "uploaded documents",
      "settings",
    ],
  },
  {
    id: 15,
    name: "saved cards",
    path: "/settings?tab=card_bank&sub_tab=card",
    tags: [
      "cards",
      "account cards",
      "my cards",
      "card",
      "transactions cards",
      "add card",
      "add new card",
      "new card",
      "settings",
    ],
  },
  {
    id: 16,
    name: "bank accounts",
    path: "/settings?tab=card_bank&sub_tab=bank",
    tags: [
      "banks",
      "account banks",
      "my banks",
      "bank",
      "transactions banks",
      "saved banks",
      "saved bank account",
      "add bank account",
      "add new bank",
      "settings",
    ],
  },
  {
    id: 17,
    name: "notification settings",
    path: "/settings?tab=notifications",
    tags: [
      "notifications",
      "in app notifications",
      "push notifications",
      "settings",
    ],
  },
];
