import useCustomNavigation from "@/hooks/use-navigation";
import ensureError from "@/lib/ensure-error";
import getSecurityQuestions from "@/services/account/get-security-questions";
import whoami from "@/services/account/whoami";
import useActions from "@/store/actions";
import { useAppSelector } from "@/store/hooks";
import * as React from "react";
import { useQuery } from "react-query";
import { toast } from "sonner";

type Todos = {
	title: string;
	path: string;
	isDone: boolean;
	action(path: string): void;
};

export default function useTodos() {
	const { account } = useAppSelector((state) => state.account);
	const { ui, account: accountActions } = useActions();
	const [hasSecurity, setHasSecurity] = React.useState(false);
	// const [isActive, setIsActive] = React.useState(false);

	const { navigate } = useCustomNavigation();

	const { isFetching, data } = useQuery(["whoami"], () => whoami(), {
		onSuccess(data) {
			accountActions.updateAccount(data);
		},
		onError(err) {
			const error = ensureError(err);
			toast.error(error.message);
		},
	});

	const hasSecurityQuestions = React.useCallback(async () => {
		if (!account.email) return;
		try {
			const response = await getSecurityQuestions({ email: account.email });
			setHasSecurity(response.length > 0);
		} catch (err) {
			const error = ensureError(err);
			toast.error(error.message);
		}
	}, [account.email]);

	const savingsOrInvestments = React.useCallback(async () => {
		// try {
		// 	// const services= [whoami]
		// 	// const responses =await Promise.all(services.map(service=> service()))
		// 	setIsActive(false);
		// } catch (err) {
		// 	const error = ensureError(err);
		// 	toast.error(error.message);
		// }
	}, []);

	React.useEffect(() => {
		hasSecurityQuestions();
		savingsOrInvestments();
	}, [hasSecurityQuestions, savingsOrInvestments]);

	const todos = React.useMemo(
		(): Todos[] => [
			{
				title: "Add your BVN",
				path: "",
				isDone:
					data?.user_verifications.has_verified_bvn || account.user_verifications.has_verified_bvn,
				action: (path: string) => {
					navigate(path);
				},
			},
			{
				title: "Add Personal Information",
				path: "",
				isDone: data?.user_profile !== null && true,
				action: (path: string) => {
					navigate(path);
				},
			},
			{
				title: "Setup your security",
				path: "",
				isDone: hasSecurity,
				action: (path: string) => {
					navigate(path);
				},
			},
			// {
			// 	title: "Setup your first savings or investment",
			// 	path: "",
			// isDone: isActive,
			// 	action: (path: string) => {
			// 		navigate(path);
			// 	},
			// },
			{
				title: "Setup your Pin",
				path: "",
				isDone: account.user_verifications.has_set_pin,
				action: (path: string) => {
					ui.changeDialog({
						show: true,
						id: path,
						type: "set_pin",
					});
				},
			},
		],
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[
			account.user_verifications.has_set_pin,
			account.user_verifications.has_verified_bvn,
			data?.user_profile,
			data?.user_verifications.has_verified_bvn,
			hasSecurity,
			navigate,
		]
	);

	return { isFetching, todos };
}
