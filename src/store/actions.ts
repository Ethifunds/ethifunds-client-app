import { User } from "@/types/user.types";
import { changeAccount, changeCurrency, changeToken, updateAccount } from "./account-slice";
import { useAppDispatch } from "./hooks";
import { Currency } from "@/types/global.types";
import {
	BackBtnPayload,
	changeBackBtn,
	changeDialog,
	changePageTitle,
	DialogPayload,
	resetDialog,
} from "./ui-slice";

export default function useActions() {
	const dispatch = useAppDispatch();
	const ui = {
		changeDialog: (payload: Partial<DialogPayload>) => dispatch(changeDialog(payload)),
		resetDialog: () => dispatch(resetDialog()),
		changePageTitle: (payload: string) => dispatch(changePageTitle(payload)),
		changeBackBtn: (payload: BackBtnPayload | null) => dispatch(changeBackBtn(payload)),
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
