import { variables } from "@/constants";
import useCustomNavigation from "@/hooks/use-navigation";
import useStorage from "@/hooks/use-storage";
import ensureError from "@/lib/ensure-error";
import sendForgotPasswordOtp from "@/services/account/forgot-password-otp";
import * as React from "react";

import { toast } from "sonner";
import { z } from "zod";

const validate = z.object({
	email: z.string().trim().toLowerCase().min(5, "Email is required"),
});

type FormData = z.infer<typeof validate>;

const initial: FormData = {
	email: "",
};
export default function useForm() {
	const [isLoading, setIsLoading] = React.useState(false);
	const [formData, setFormData] = React.useState<FormData>(initial);
	const [errorMsg, setErrorMsg] = React.useState("");
	const { setData } = useStorage(variables.STORAGE.email, "", "sessionStorage");

	const { navigate } = useCustomNavigation();

	const updateForm = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;

		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const submit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		try {
			const formValues = validate.parse(formData);

			await sendForgotPasswordOtp(formValues);
			console.log(formData.email);
			setData(formValues.email);

			toast.success("OTP sent to email");

			navigate("/recovery/verify-email");
		} catch (error) {
			const errMsg = ensureError(error);
			setErrorMsg(errMsg.message);
			toast.error(errMsg.message, {
				position: "top-right",
			});
		} finally {
			setIsLoading(false);
		}
	};

	return {
		isLoading,
		formData,
		errorMsg,
		updateForm,
		submit,
	};
}
