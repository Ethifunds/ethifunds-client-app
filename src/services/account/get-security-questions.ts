import { variables } from "@/constants";
import axios from "@/lib/axios";
import { SecurityQuestion } from "@/types/security-questions.types";



type Response = SecurityQuestion;

export async function production(): Promise<Response[]> {
  const response = await axios.get(`/auth/user-security-questions`);
  return response.data.data;
}

export async function development(): Promise<Response[]> {
  return new Promise((resolve) => {
    setTimeout(
      () =>
        resolve([
          {
            id: 1,
            security_question: "What is your mother's maiden name?",
          },
          {
            id: 2,
            security_question: "What was the name of your primary school?",
          },
          {
            id: 3,
            security_question: "In what city were you born?",
          },
          {
            id: 4,
            security_question: "What’s your favorite sport?",
          },
          {
            id: 5,
            security_question: "What’s your oldest child's middle name?",
          },
        ]),
      2000,
    );
  });
}

export default async function getSecurityQuestions(): Promise<Response[]> {
  if (variables.NODE_ENV === "development") return development();

  return production();
}
