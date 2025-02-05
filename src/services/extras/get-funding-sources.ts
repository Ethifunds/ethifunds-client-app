import { variables } from "@/constants";
import { FundingSource } from "@/types/global.types";
import axios from "@/lib/axios";

type Response = FundingSource[];

export async function production(): Promise<Response> {
	const response = await axios.get(`/public/funding-source`);

	return response.data.data;
}

export async function development(): Promise<Response> {
	return new Promise((resolve) => {
		setTimeout(
			() =>
				resolve([
					{
						id: "bank_card",
						name: "Bank Card",
					},
					{
						id: "bank_transfer",
						name: "Bank Transfer",
					},
					{
						id: "user_wallet",
						name: "Ethifund Savings Wallet",
					},
					{
						id: "investment_vault",
						name: "Investment Vault",
					},
					{
						name: "Investment Account",
						id: "investment_account",
					},
					{
						id: "ethicoop_savings",
						name: "Ethicoop Contribution Account",
					},
				]),
			2000
		);
	});
}

export default async function getFundingSources(): Promise<Response> {
	if (variables.NODE_ENV === "development") return development();

	return production();
}
