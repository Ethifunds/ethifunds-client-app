import { variables } from "@/constants";
import { users } from "@/constants/data/users";
import axios from "@/lib/axios";
import { User } from "@/types/user.types";

type Parameters = {
	first_name: string;
	last_name: string;
	middle_name?: string;
	phone_number: string;
	username: string;
	date_of_birth: string;
	gender: string;
	// address?: string;
	// occupation: string;
	// income_level?: string;
};

type Response = User;

export async function production(data: Parameters): Promise<Response> {
	const response = await axios.post(`/auth/login`, data);
	return response.data;
}

export async function development(): Promise<Response> {
	return new Promise((resolve) => {
		setTimeout(() => resolve(users[0]), 2000);
	});
}

export default async function updateUser(data: Parameters): Promise<Response> {
	if (variables.NODE_ENV === "development") return development();

	return production(data);
}
