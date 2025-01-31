export type Currency = {
	name: string;
	code: string;
	sign: string;
	country: string;
	flag: string;
};

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
	pagination: boolean;
};
