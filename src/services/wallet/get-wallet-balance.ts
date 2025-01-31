import { variables } from "@/constants";
import axios from "@/lib/axios";
import buildQueryString from "@/lib/build-query-string";
import { generateDigits } from "@/lib/generate-digits";

type Parameters = {
	currency: string;
};

type Response = {
	wallet: number;
	vault: number;
	investment: number;
};

export async function production(data: Parameters): Promise<Response> {
	const query_string = buildQueryString(data);
	const response = await axios.get(`/account/balances?${query_string}`);
	return response.data.data;
}

export async function development(): Promise<Response> {
	return new Promise((resolve) => {
		setTimeout(
			() =>
				resolve({
					wallet: generateDigits(999999),
					vault: generateDigits(999999),
					investment: generateDigits(999999),
				}),
			2000
		);
	});
}

export default async function getWalletBalance(data: Parameters): Promise<Response> {
	if (variables.NODE_ENV === "development") return development();

	return production(data);
}
