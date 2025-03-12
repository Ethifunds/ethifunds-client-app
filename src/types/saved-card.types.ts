export type SavedCard = {
  id: number;
  user_id: number;
  token_source: string;
  bin: string;
  last4: string;
  exp_month: number;
  exp_year: number;
  card_type: string;
  bank: string;
  country_code: string;
  brand: string;
  account_name: string;
  is_default: boolean;
  created_at: string;
  updated_at: string;
};
