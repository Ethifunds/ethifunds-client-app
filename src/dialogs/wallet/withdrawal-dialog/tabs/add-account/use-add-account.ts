import ensureError from "@/lib/ensure-error";
import addAccount from "@/services/settings/bank/add-account";
import getBankList from "@/services/extras/get-bank-list";
import verifyAccountNumber from "@/services/settings/bank/verify-account-number";
import { Bank, BankAccount } from "@/types/bank-account.types";
import * as React from "react";
import { toast } from "sonner";
import { z } from "zod";
import { ChangeTab } from "../../use-withdrawal";

type SetAddedAccount = (account: BankAccount) => void;

const validation = z.object({
	name: z.string().trim().min(3, "Account name is required"),
	account_number: z.string().trim().min(10, "Account number is required"),
	bank_code: z.string().trim().min(2, "Bank Name is Required"),
});

type FormData = z.infer<typeof validation>;

const init: FormData = {
	name: "",
	account_number: "",
	bank_code: "",
};

export default function useAddAccount(changeTab: ChangeTab, setAddedAccount: SetAddedAccount) {
	const [isLoading, setIsLoading] = React.useState(false);
	const [validating, setValidating] = React.useState(false);
	const [formData, setFormData] = React.useState<FormData>(init);
	const [bankList, setBankList] = React.useState<Bank[]>([]);

	const submitRef = React.useRef<HTMLDivElement>(null);

	const reset = () => {
		setFormData(init);
	};

	const resetBankAndName = () => {
		if (formData.bank_code && formData.name) {
			setFormData((prev) => ({
				...prev,
				bank_code: "",
				name: "",
			}));
		}
	};

	const scrollIntoView = React.useCallback(() => {
		if (submitRef.current) {
			submitRef.current.scrollIntoView({
				block: "end",
				behavior: "smooth",
			});
		}
	}, []);

	const formChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value } = e.target;
		if (name === "account_number") {
			resetBankAndName();
		}
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const selectBank = (value: string) => {
		setFormData((prev) => ({
			...prev,
			bank_code: value,
		}));
	};

	React.useMemo(async () => {
		try {
			const response = await getBankList();
			setBankList(response);
		} catch (error) {
			const err = ensureError(error);

			toast.error(err.message);
		}
	}, []);

	const verifyAccount = React.useCallback(async () => {
		if (!formData.bank_code || !formData.account_number.trim()) return;

		setValidating(true);

		try {
			const response = await verifyAccountNumber({
				account_number: formData.account_number,
				bank_code: formData.bank_code,
			});

			setFormData((prev) => ({
				...prev,
				name: response.account_name,
			}));
			scrollIntoView();
		} catch (error) {
			const err = ensureError(error);
			toast.error(err.message);
		} finally {
			setValidating(false);
		}
	}, [formData.account_number, formData.bank_code, scrollIntoView]);

	const submit = async () => {
		setIsLoading(true);

		try {
			const formValues = validation.parse(formData);
			const response = await addAccount(formValues);
			setAddedAccount(response);
			toast.success("Account added Successfully");
			reset();
			changeTab("withdraw_funds");
		} catch (error) {
			const err = ensureError(error);
			toast.error(err.message);
		} finally {
			setIsLoading(false);
		}
	};

	React.useEffect(() => {
		verifyAccount();
	}, [verifyAccount]);

	return {
		isLoading,
		validating,
		formData,
		bankList,
		submitRef,
		formChange,
		selectBank,
		submit,
	};
}
