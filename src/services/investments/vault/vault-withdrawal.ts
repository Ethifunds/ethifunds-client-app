import { variables } from "@/constants";
import axios from "@/lib/axios";
import {  InvestmentVault } from "@/types/investment-vault.types";

type Parameters = {
	amount: number;
	pin: string;
	currency: string;
};

type Payload = {
	source_account: InvestmentVault;
	destination_account: InvestmentVault;
	amount: string;
	success: boolean;
};
type Response = Payload | undefined;

export async function production({ currency, ...data }: Parameters): Promise<Response> {
	const response = await axios.post(`/investment/withdraw-from-vault?${currency}`, data);
	return response.data.data;
}

export async function development(): Promise<Response> {
	return new Promise((resolve) => {
		setTimeout(
			() =>
				resolve({
					source_account: {
						id: 1,
						user_id: 1,
						account_type_id: 1,
						account_tier_id: 1,
						currency: "NGN",
						status: "active",
						remark: null,
						available_balance: 600100,
						ledger_balance: "0.00",
						withdrawable_balance: 600100,
						account_locked_until: null,
						opened_at: "2025-01-24 01:12:51",
						closed_at: null,
						created_at: "2025-01-24T01:12:51.000000Z",
						updated_at: "2025-02-03T00:16:47.000000Z",
					},
					destination_account: {
						id: 3,
						user_id: 1,
						account_type_id: 2,
						account_tier_id: 1,
						currency: "NGN",
						status: "active",
						remark: null,
						available_balance: 150000,
						ledger_balance: "0.00",
						withdrawable_balance: 150000,
						account_locked_until: null,
						opened_at: "2025-02-02 23:17:11",
						closed_at: null,
						created_at: "2025-02-02T23:17:11.000000Z",
						updated_at: "2025-02-03T00:16:47.000000Z",
					},
					amount: "50000",
					success: true,
				}),
			2000
		);
	});
}

export default async function vaultWithdrawal(data: Parameters): Promise<Response> {
	if (variables.NODE_ENV === "development") return development();

	return production(data);
}
