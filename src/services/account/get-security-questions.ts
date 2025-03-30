import { variables } from "@/constants";
import axios from "@/lib/axios";
import { SecurityQuestion } from "@/types/security-questions.types";

type Response = SecurityQuestion;

export async function production(): Promise<Response[]> {
  const response = await axios.get(`/auth/security-questions`);
  return response.data.data;
}

export async function development(): Promise<Response[]> {
  return new Promise((resolve) => {
    setTimeout(
      () =>
        resolve([
          {
            id: 1,
            question: "What is your mother's maiden name?",
            is_active: 1,
          },
          {
            id: 2,
            question: "What was the name of your first pet?",
            is_active: 1,
          },
          {
            id: 3,
            question: "What is the name of the street you grew up on?",
            is_active: 1,
          },
          {
            id: 4,
            question: "What was the make and model of your first car?",
            is_active: 1,
          },
          {
            id: 5,
            question: "What was your high school mascot?",
            is_active: 1,
          },
          {
            id: 6,
            question: "What is the name of your favorite childhood friend?",
            is_active: 1,
          },
          {
            id: 7,
            question: "What is your favorite food?",
            is_active: 1,
          },
          {
            id: 8,
            question: "In what city were you born?",
            is_active: 1,
          },
          {
            id: 9,
            question: "What was the name of your elementary school?",
            is_active: 1,
          },
          {
            id: 10,
            question: "What is your favorite color?",
            is_active: 1,
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
