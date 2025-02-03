import { variables } from "@/constants";
import useCookie from "@/hooks/use-cookie";
import useCustomNavigation from "@/hooks/use-navigation";
import useStorage from "@/hooks/use-storage";
import ensureError from "@/lib/ensure-error";
import loginAccount from "@/services/account/login-account";
import useActions from "@/store/actions";
import * as React from "react";

import { toast } from "sonner";
import { z } from "zod";

const validate = z.object({
	email: z.string().trim().toLowerCase().email().optional(),
	username: z.string().trim().min(3, "username must be at least 3 characters long").optional(),
	password: z.string().trim().min(8, "password is required"),
});

type FormData = z.infer<typeof validate>;
const initial: FormData = {
	email: "",
	username: "",
	password: "",
};
export default function useForm() {
	const [isLoading, setIsLoading] = React.useState(false);
	const [formData, setFormData] = React.useState<FormData>(initial);
	const [errorMsg, setErrorMsg] = React.useState("");
	const [rememberMe, setRememberMe] = React.useState(false);
	const { setData } = useStorage(variables.STORAGE.remember_me, false, "sessionStorage");
	const { setCookie } = useCookie(variables.STORAGE.session, "");

	const { account } = useActions();
	const { navigate } = useCustomNavigation();

	const sanitizePayload = (): FormData => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

		if (emailRegex.test(formData.email ?? "")) {
			return {
				email: formData.email,
				password: formData.password,
			};
		}
		return {
			username: formData.email,
			password: formData.password,
		};
	};

	const updateForm = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;

		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleRememberMe = () => {
		setData(true);
	};

	const submit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		try {
			const formValues = validate.parse(sanitizePayload());

			const response = await loginAccount(formValues);
			account.changeAccount(response.user);
			account.changeToken(response.token);
			setCookie(response.token);

			if (rememberMe) {
				handleRememberMe();
			}

			if (response.user.two_factor) {
				return navigate("2fa-verify");
			}
			return navigate("/home");
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
		setRememberMe,
		updateForm,
		submit,
	};
}
