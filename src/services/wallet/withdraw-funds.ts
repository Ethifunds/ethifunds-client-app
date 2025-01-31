import { variables } from "@/constants";
import axios from "@/lib/axios";


type Parameters = {
    amount: string
    recipient: string
};

type Response = void

export async function production(data: Parameters): Promise<Response> {
	
	const response = await axios.post(`/account/withdraw`, data);
	return response.data.data;
}

export async function development(): Promise<Response> {
	return new Promise((resolve) => {
		setTimeout(() => resolve(), 2000);
	});
}

export default async function withdrawFunds(data: Parameters): Promise<Response> {
	if (variables.NODE_ENV === "development") return development();

	return production(data);
}
