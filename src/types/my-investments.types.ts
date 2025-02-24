import { InvestmentCategory, SaleOption } from "./investments.types";

export type MyInvestmentTransactionType = "credit" | "debit" | "transfer";

export type MyInvestmentTransactionStatus = "success" | "failed" | "pending";

export type MyActiveInvestment = {
  category: InvestmentCategory;
  investments: ActiveInvestmentInvestments[];
  sum: number;
  recent_transactions: MyInvestmentTransactions[];
};

export type ActiveInvestmentInvestments = {
  id: number;
  user_id: number;
  product_id: number;
  investment_type: string;
  status: string;
  total_invested: string;
  units_purchased: number;
  start_at: string;
  end_at: string | null;
  matured_at: string | null;
  canceled_at: string | null;
  interest_accrued: string;
  total_roi: string;
  next_payout_date: string | null;
  payout_frequency: string | null;
  last_payout_amount: string | null;
  profit_withdrawn: string;
  withdrawable_balance: string;
  investment_growth: number;
  transaction_reference: string | null;
  investment_plan_details: string | null;
  created_at: string;
  updated_at: string;
};

export type MyInvestmentProductCustodian = {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  description: string;
  status: string;
  created_at: string;
  updated_at: string;
};

export type MyInvestmentProduct = {
  id: number;
  name: string;
  product_custodian_id: number | null;
  product_category_id: number;
  display_image: string;
  account_id: number;
  type: string;
  description: string;
  minimum_investment: string;
  maximum_investment: string;
  expected_roi: number;
  tenor_unit: string;
  tenor_value: number;
  unit_price: string;
  unit_start_price: null | string;
  total_units: number;
  units_sold: number;
  contribution_frequency: string;
  contribution_amount: string;
  profit_sharing_ratio: number;
  dividend_payout_frequency: string;
  funding_goal: string;
  amount_raised: string;
  funding_deadline: string;
  bond_issuer: null;
  bond_interest_rate: null;
  hybrid_components: [];
  status: string;
  created_at: string;
  updated_at: string;
  custodian: MyInvestmentProductCustodian | null;
};

export type MyInvestmentTransactions = {
  id: number;
  account_id: string;
  transaction_type: MyInvestmentTransactionType;
  transaction_reference: string;
  description: string;
  amount: string;
  status: MyInvestmentTransactionStatus;
  account_balance_before: string;
  account_balance_after: string;
  transaction_date: string;
  remark: string | null;
  fee: string;
  created_at: string;
  updated_at: string;
};

export type MyInvestmentMarketplace = {
  id: number;
  product_id: number;
  seller_product_id: number;
  buyer_product_id: null;
  units: number;
  final_price_per_unit: string;
  asking_price_per_unit: string;
  counter_price_per_unit: string;
  total_price: string;
  offer: {
    units: number;
    offer_price: number;
    requested_at: string;
  };
  sale_option: SaleOption;
  status: string;
  created_at: string;
  updated_at: string;
  product: MyInvestmentProduct;
};

export type MyCompletedInvestments = ActiveInvestmentInvestments & {
  product: Omit<MyInvestmentProduct, "custodian">;
};
