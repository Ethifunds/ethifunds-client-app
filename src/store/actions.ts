import { User } from "@/types/user.types";
import { changeAccount, changeCurrency, changeToken, updateAccount } from "./account-slice";
import { useAppDispatch } from "./hooks";
import { Currency } from "@/global.types";
import { changeDialog, DialogPayload } from "./ui-slice";

export default function useActions() {
	const dispatch = useAppDispatch();
	const ui = {
		changeDialog: (payload: Partial<DialogPayload>) => dispatch(changeDialog(payload)),
	};

	const account = {
		changeAccount: (payload: User) => dispatch(changeAccount(payload)),
		changeToken: (payload: string) => dispatch(changeToken(payload)),
		updateAccount: (payload: Partial<User>) => dispatch(updateAccount(payload)),
		changeCurrency: (payload: Currency) => dispatch(changeCurrency(payload)),
	};
	return {
		ui,
		account,
	};
}
