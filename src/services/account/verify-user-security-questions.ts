import { variables } from "@/constants";
import axios from "@/lib/axios";
import { SecurityAnswer } from "@/types/security-questions.types";

type Parameters = {
	email: string;
	responses: Omit<SecurityAnswer, "correct">[];
};

type Response = SecurityAnswer;

export async function production(data: Parameters): Promise<Response[]> {
	const response = await axios.get(`/auth/user-security-questions?email=${data.email}`);
	return response.data.data;
}

export async function development(): Promise<Response[]> {
	return new Promise((resolve) => {
		setTimeout(
			() =>
				resolve([
					{
						question_id: 3,
						answer: "lagos",
						correct: true,
					},
					{
						question_id: 1,
						answer: "nwakanma",
						correct: true,
					},
				]),
			2000
		);
	});
}

export default async function verifySecurityQuestions(data: Parameters): Promise<Response[]> {
	if (variables.NODE_ENV === "development") return development();

	return production(data);
}
