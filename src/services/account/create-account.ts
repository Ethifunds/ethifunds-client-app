import { variables } from "@/constants";
import { users } from "@/constants/data/users";
import axios from "@/lib/axios";

type Parameters = {
	email: string;
	username: string;
	// phone_number: string;
	password: string;
	confirm_password: string;
	terms: boolean;
};

type Response = {
	username: string;
	email: string;
	phone_number: string;
	updated_at: string;
	created_at: string;
	id: string;
};

export async function production(data: Parameters): Promise<Response> {
	const response = await axios.post(`/auth/register`, data);
	return response.data.data;
}

export async function development(): Promise<Response> {
	return new Promise((resolve) => {
		setTimeout(() => resolve(users[0]), 2000);
	});
}

export default async function createAccount(data: Parameters): Promise<Response> {
	if (variables.NODE_ENV === "development") return development();

	return production(data);
}
