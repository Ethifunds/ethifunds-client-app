export type InvestmentCategory = {
  id: number;
  name: string;
  display_image: string;
  description: string;
  display_title: string;
  type: string;
  status: string;
  created_at: string | null;
  updated_at: string | null;
};

export type InvestmentProductCustodian = {
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

export type InvestmentProduct = {
  id: number;
  name: string;
  product_custodian_id: number;
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
  custodian: InvestmentProductCustodian;
  category: InvestmentCategory;
};

export type InvestmentProductHistoricData = {
  id: number;
  product_id: number;
  date: string;
  unit_price: string;
  total_units: number;
  units_sold: number;
  contribution_amount: string;
  amount_raised: string;
  created_at: string;
  updated_at: string;
};

export type InvestmentUserInfo = {
  id: number;
  username: string;
  email: string;
  phone_number: string;
  last_login: string | null;
  login_attempt_count: number;
  status: string;
  remark: string | null;
  locked_until: string | null;
  profile_picture: string | null;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
  has_set_pin: boolean;
};

export type SellerInvestmentInfo = {
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
  user: InvestmentUserInfo;
};

export type investmentMarketplaceProduct = {
  id: number;
  product_id: number;
  seller_product_id: number;
  buyer_product_id: number | null;
  units: number;
  final_price_per_unit: string;
  asking_price_per_unit: string;
  counter_price_per_unit: string;
  total_price: string;
  sale_option: string;
  status: string;
  created_at: string;
  updated_at: string;
  product: Omit<InvestmentProduct, "category"> & {
    unit_start_price: string | null;
  };
  seller_investment_info: SellerInvestmentInfo;
};


