export type VaultTransactionStatus = "success" | "failed" | "pending";
export type VaultTransactionType = "debit" | "credit" | "transfer";


export type InvestmentVault = {
	id: number;
	user_id: number;
	account_type_id: number;
	account_tier_id: number;
	currency: string;
	status: string;
	remark: string | null;
	available_balance: string | number;
	ledger_balance: string | number;
	withdrawable_balance: string | number;
	account_locked_until: string | null;
	opened_at: string;
	closed_at: string | null;
	created_at: string;
	updated_at: string;
};

export type InvestmentVaultTransaction = {
	id: number;
	account_id: string;
	transaction_type: VaultTransactionType;
	transaction_reference: string;
	description: string;
	amount: string;
	status: VaultTransactionStatus;
	account_balance_before: string;
	account_balance_after: string;
	transaction_date: string;
	remark: string | null;
	fee: string;
	created_at: string;
	updated_at: string;
};
