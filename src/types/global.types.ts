export type Currency = {
	name: string;
	code: string;
	sign: string;
	country: string;
	flag: string;
};

export type FundingSourceTypes =
	| "bank_card"
	| "bank_transfer"
	| "user_wallet"
	| "investment_vault"
	| "investment_account"
	| "ethicoop_savings";

export type FundingSource = { id: FundingSourceTypes; name: string };

export type PaginatedResponse<T> = {
	docs: T[];
	totalDocs: number;
	limit: number;
	page: number;
	totalPages: number;
	hasNextPage: boolean;
	nextPage: number | null;
	hasPrevPage: boolean;
	prevPage: number | null;
	pagingCounter: number;
};

export type PaginationQuery = {
	page: number;
	limit: number;
};
