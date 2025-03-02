export type TabsValues =
  | "ongoing_investments"
  | "marketplace"
  | "completed_investments"
  | "all"
  | "sme_financing"
  | "lpo_financing"
  | "asset_financing";

export type EthivestTab = {
  title: string;
  value: TabsValues;
};

export const ethivestTabs: EthivestTab[] = [
  {
    title: "Ongoing Investments",
    value: "ongoing_investments",
  },
  {
    title: "Explore Opportunities",
    value: "marketplace",
  },
  {
    title: "Completed Investments",
    value: "completed_investments",
  },
];
