import { variables } from "@/constants";
import useCustomNavigation from "@/hooks/use-navigation";
import useStorage from "@/hooks/use-storage";
import ensureError from "@/lib/ensure-error";
import sanitizeText from "@/lib/sanitize-text";
import getSecurityQuestions from "@/services/account/get-security-questions";
import verifySecurityQuestions from "@/services/account/verify-security-questions copy";
import { SecurityAnswer, SecurityQuestion } from "@/types/security-questions.types";
import * as React from "react";
import { useQuery } from "react-query";
import { toast } from "sonner";

type FormData = Omit<SecurityAnswer, "correct">[];

const initial: FormData = [
	{
		question_id: 0,
		answer: "",
	},
	{
		question_id: 0,
		answer: "",
	},
];

export default function useForm() {
	const [verifying, setVerifying] = React.useState(false);
	const [formData, setFormData] = React.useState<FormData>(initial);
	const { data: savedEmail } = useStorage(variables.STORAGE.email, "", "sessionStorage");
	const [securityQuestions, setSecurityQuestions] = React.useState<SecurityQuestion[]>([]);
	const [invalidAnswers, setInvalidAnswers] = React.useState<FormData>([]);

	const { navigate, queryParams } = useCustomNavigation();

	const userEmail = React.useMemo(() => {
		return queryParams.get("email") ?? "";
	}, [queryParams]);

	React.useEffect(() => {
		const restart = () => {
			toast.error("Malformed email kindly restart the process.");
			setTimeout(() => {
				navigate("/recovery", { replace: true });
			}, 3000);
		};

		if (!userEmail || !savedEmail) return restart();

		if (sanitizeText(savedEmail) !== sanitizeText(userEmail)) return restart();
	}, [userEmail, savedEmail, navigate]);

	const query = useQuery(
		["security-questions", userEmail],
		() => getSecurityQuestions({ email: userEmail }),
		{
			enabled: userEmail.length > 0,

			onSuccess(data) {
				setSecurityQuestions(data);
			},
		}
	);

	const updateForm = (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
		const { value } = e.target;

		setFormData((prev) =>
			prev.map((item, index) =>
				index === idx ? { ...item, question_id: securityQuestions[idx].id, answer: value } : item
			)
		);
	};

	const submit = async (e: React.FormEvent) => {
		e.preventDefault();

		setVerifying(true);
		try {
			if (formData.some((item) => item.answer.length < 1 || item.question_id < 1)) {
				throw new Error("Answer all security questions");
			}

			const payload = {
				email: userEmail,
				responses: formData,
			};

			const response = await verifySecurityQuestions(payload);

			if (response) {
				const failed = response.filter((item) => !item.correct);
				if (failed.length > 0) {
					setInvalidAnswers(failed);
					const failedQuestionIdx = formData.findIndex(
						(item) => item.question_id === failed[0].question_id
					);
					if (failedQuestionIdx !== -1) {
						throw new Error(`Question ${failedQuestionIdx + 1} is incorrect`);
					}
				} else {
					navigate("/recovery/reset-password", { replace: true });
				}
			}
		} catch (error) {
			const errMsg = ensureError(error);
			toast.error(errMsg.message, {
				position: "top-right",
			});
		} finally {
			setVerifying(false);
		}
	};

	return {
		verifying,
		formData,
		securityQuestions,
		invalidAnswers,
		...query,
		updateForm,
		submit,
	};
}
