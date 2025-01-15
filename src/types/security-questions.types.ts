export type SecurityQuestion = {
	id: number;
	security_question: string;
};

export type SecurityAnswer = {
	question_id: number;
	answer: string;
	correct: boolean;
};
