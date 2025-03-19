export const savingsFundingSources = ["wallet", "card"] as const;
export const savingsFundingPreference = ["automatic", "manual"] as const;
export type SavingsFundingSource = (typeof savingsFundingSources)[number];
export type SavingsFundingPreference =
  (typeof savingsFundingPreference)[number];

export type Savings = {
  id: number;
  user_id: number;
  saving_type: string;
  ethicoop_cycle_id: number;
  contribution_amount: string;
  contribution_date: string;
  funding_source: SavingsFundingSource;
  funding_preference: SavingsFundingPreference;
  status: string;
  has_contributed: boolean;
  created_at: string;
  updated_at: string;
  total_contribution: string;
  ethicoop_cycle: SavingsCycle;
};

export type SavingsCycle = {
  id: number;
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  status: string;
  created_by: number;
  cycle_type: string;
  roi: string;
  min_amount: string;
  max_amount: string;
  interest_type: string;
  interest_frequency: string;
  interest_duration: number;
  created_at: string;
  updated_at: string;
};


