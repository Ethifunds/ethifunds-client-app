import { variables } from "@/constants";
import axios from "@/lib/axios";

type Response = string[];

export async function production(): Promise<Response> {
	const response = await axios.get(`/public/supported-currencies`);

	return response.data.data;
}

export async function development(): Promise<Response> {
	return new Promise((resolve) => {
		setTimeout(() => resolve(["NGN", "USD", "GBP", "EUR"]), 2000);
	});
}

export default async function getSupportedCurrencies(): Promise<Response> {
	if (variables.NODE_ENV === "development") return development();

	return production();
}
