import { Savings } from "@/types/savings.types";

export const savings: Savings[] = [
  {
    id: 1,
    user_id: 1,
    saving_type: "ethicoop",
    ethicoop_cycle_id: 1,
    contribution_amount: "50000.00",
    contribution_date: "2025-03-11",
    funding_source: "wallet",
    funding_preference: "automatic",
    status: "active",
    created_at: "2025-03-11T22:46:41.000000Z",
    updated_at: "2025-03-11T22:49:47.000000Z",
    total_contribution: "0.00",
    has_contributed: false,
    ethicoop_cycle: {
      id: 1,
      title: "1th Quarter, 2025 Ethicoop Savings",
      description: `Ethicoop is a high-yield, Shariah-compliant cooperative savings wallet that enables group savings with a minimum monthly contribution of N50,000. The product offers quarterly dividends to shareholders, providing a structured, interest-free savings model that aligns with Islamic finance principles.
Subscribers to Ethicoop can benefit from automated or manual monthly contributions, with the flexibility to make surplus contributions. Quarterly dividends are credited to the Ethicoop wallet, accruing over time and becoming available for withdrawal after a one-year tenure. Users have the option for an early, quarterly withdrawal if they provide a one-month notice.
`,
      start_date: "2025-01-01",
      end_date: "2025-03-31",
      status: "active",
      created_by: 1,
      cycle_type: "default",
      roi: "7.50",
      min_amount: "50000.00",
      max_amount: "0.00",
      interest_type: "none",
      interest_frequency: "quarterly",
      interest_duration: 90,
      created_at: "2025-03-11T22:31:27.000000Z",
      updated_at: "2025-03-11T22:31:27.000000Z",
    },
  },
];
