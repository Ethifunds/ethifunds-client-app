import ensureError from "@/lib/ensure-error";
import setUserPin from "@/services/settings/set-pin";
import useActions from "@/store/actions";
import { useAppSelector } from "@/store/hooks";
import * as React from "react";
import { toast } from "sonner";
import { z } from "zod";

const validation = z.object({
	pin: z
		.number({ message: "Pin must be a number" })
		.min(1000, { message: "Pin must be at least 4 digits long" })
		.max(9999, { message: "Pin must not be more than 4 digits long!" }),
});

const init = {
	pin: "",
	confirm_pin: "",
};
export default function usePin() {
	const { dialog } = useAppSelector((state) => state.ui);
	const { account } = useAppSelector((state) => state.account);
	const [formData, setFormData] = React.useState(init);
	const [isLoading, setIsLoading] = React.useState(false);
	const [activeTab, setActiveTab] = React.useState("set_pin"); // set_pin, confirm_pin, pin_success,
	const [errMsg, setErrMsg] = React.useState("");

	const { ui, account: accountActions } = useActions();

	const reset = () => {
		if (isLoading) return;
		setFormData(init);
		setErrMsg("");
		setActiveTab("set_pin");
	};

	const toggleShow = (val: boolean) => {
		if (isLoading) return;
		ui.changeDialog({ show: val, type: "", id: "" });
	};

	const open = React.useMemo(() => {
		return dialog.show && dialog.type === "set_pin";
	}, [dialog.show, dialog.type]);

	const close = () => {
		toggleShow(false);
		reset();
	};

	const updateForm = (value: string, name: keyof typeof formData) => {
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const changeTab = (tab: string) => {
		setActiveTab(tab);
	};

	const submit = async () => {
		setIsLoading(true);
		try {
			if (formData.pin !== formData.confirm_pin) throw new Error("Both pins must match");
			const formValues = validation.parse({ pin: 1234 });
			await setUserPin(formValues);
			accountActions.updateAccount({
				user_verifications: {
					...account.user_verifications,
					has_set_pin: true,
				},
			});
			setActiveTab("pin_success");
		} catch (error) {
			const errorMsg = ensureError(error).message;
			setErrMsg(errorMsg);
			toast.error(errorMsg);
			reset();
		} finally {
			setIsLoading(false);
		}
	};

	return {
		open,
		errMsg,
		formData,
		activeTab,
		isLoading,
		close,
		submit,
		changeTab,
		updateForm,
	};
}
