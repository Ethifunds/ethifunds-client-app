import { variables } from "@/constants";
import axios from "@/lib/axios";
import { UserSecurityQuestion } from "@/types/security-questions.types";

type Parameters = {
  email: string;
};

type Response = UserSecurityQuestion;

export async function production(data: Parameters): Promise<Response[]> {
  const response = await axios.get(
    `/auth/user-security-questions?email=${data.email}`,
  );
  return response.data.data;
}

export async function development(): Promise<Response[]> {
  return new Promise((resolve) => {
    setTimeout(
      () =>
        resolve([
          {
            id: 2,
            security_question: "In what city were you born?",
          },
          {
            id: 3,
            security_question: "What is your mother's maiden name?",
          },
        ]),
      2000,
    );
  });
}

export default async function getUserSecurityQuestions(
  data: Parameters,
): Promise<Response[]> {
  if (variables.NODE_ENV === "development") return development();

  return production(data);
}
