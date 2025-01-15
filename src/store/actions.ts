import { User } from "@/types/user.types";
import { changeAccount, changeToken, updateAccount } from "./account-slice";
import { useAppDispatch } from "./hooks";

export default function useActions() {
	const dispatch = useAppDispatch();
	const account = {
		changeAccount: (payload: User) => dispatch(changeAccount(payload)),
		changeToken: (payload: string) => dispatch(changeToken(payload)),
		updateAccount: (payload: Partial<User>) => dispatch(updateAccount(payload)),
	};
	return {
		account,
	};
}
