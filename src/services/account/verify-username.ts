import { variables } from "@/constants";
import { users } from "@/constants/data/users";
import axios from "@/lib/axios";
import { User } from "@/types/user.types";

type Parameters = {
	username: string;
};

type Response = User | null;

export async function production(data: Parameters): Promise<Response> {
	const response = await axios.post(`/auth/register`, data);
	return response.data.data;
}

export async function development(data: Parameters): Promise<Response> {
	return new Promise((resolve) => {
		setTimeout(
			() =>
				resolve(
					users[0].username.trim().toLocaleLowerCase() === data.username.trim().toLocaleLowerCase()
						? users[0]
						: null
				),
			2000
		);
	});
}

export default async function verifyUsername(data: Parameters): Promise<Response> {
	if (variables.NODE_ENV === "development") return development(data);

	return production(data);
}
