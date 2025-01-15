import { variables } from "@/constants";
import axios from "@/lib/axios";

type Parameters = {
	token: string;
};

type Response = boolean;

export async function production(data: Parameters): Promise<Response> {
	const response = await axios.post(`2fa/verify`, data);
	return response.data.data;
}

export async function development(): Promise<Response> {
	return new Promise((resolve) => {
		setTimeout(() => resolve(true), 2000);
	});
}

export default async function twoFactoryVerify(data: Parameters): Promise<Response> {
	if (variables.NODE_ENV === "development") return development();

	return production(data);
}
