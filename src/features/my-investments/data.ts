export type TabsValues =
  | "ongoing_investments"
  | "marketplace"
  | "listed_investments"
  | "completed_investments";

export type MyInvestmentsTab = {
  title: string;
  value: TabsValues;
};

export const myInvestmentTabs: MyInvestmentsTab[] = [
  {
    title: "Ongoing Investments",
    value: "ongoing_investments",
  },
  {
    title: "Explore Marketplace",
    value: "marketplace",
  },
  {
    title: "Listed Investments",
    value: "listed_investments",
  },
  {
    title: "Completed Investments",
    value: "completed_investments",
  },
];
