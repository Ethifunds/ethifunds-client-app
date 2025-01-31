export type TransactionType = "credit" | "debit" | "transfer";

export type TransactionStatus = "success" | "failed" | "pending";
export type Transaction = {
	id: number;
	account_id: string;
	transaction_type: TransactionType;
	transaction_reference: string;
	description: string;
	amount: string;
	status: TransactionStatus;
	account_balance_before: string;
	account_balance_after: string;
	transaction_date: string;
	remark: string | null;
	fee: string;
	created_at: string;
	updated_at: string;
};
