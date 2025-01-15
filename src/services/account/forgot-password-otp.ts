import { variables } from "@/constants";
import axios from "@/lib/axios";

type Parameters = {
	email: string;
};

type Response = void;

export async function production(data: Parameters): Promise<Response> {
	await axios.post(`/auth/forgot-password`, data);
}

export async function development(): Promise<Response> {
	return new Promise((resolve) => {
		setTimeout(() => resolve(), 2000);
	});
}

export default async function sendForgotPasswordOtp(data: Parameters): Promise<Response> {
	if (variables.NODE_ENV === "development") return development();

	return production(data);
}
