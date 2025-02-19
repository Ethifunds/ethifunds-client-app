export type UserSecurityQuestion = {
  id: number;
  security_question: string;
};

export type SecurityAnswer = {
  question_id: number;
  answer: string;
  correct: boolean;
};
export type SecurityQuestion = {
  id: number;
  question: string;
  is_active: number;
};
