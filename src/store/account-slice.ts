import { currencyList } from "@/constants/currency-list";
import { Currency } from "@/types/global.types";
import { User } from "@/types/user.types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AccountState = {
	account: User;
	token: string;
	currency: Currency;
};

const initialState: AccountState = {
	account: {} as User,
	token: "",
	currency: currencyList[0],
};

const accountSlice = createSlice({
	name: "account",
	initialState,
	reducers: {
		changeAccount: (state, action: PayloadAction<User>) => {
			return {
				...state,
				account: action.payload,
			};
		},

		changeToken: (state, action: PayloadAction<string>) => {
			return {
				...state,
				token: action.payload,
			};
		},

		updateAccount: (state, action: PayloadAction<Partial<User>>) => {
			return {
				...state,
				account: { ...state.account, ...action.payload },
			};
		},

		changeCurrency: (state, action: PayloadAction<Currency>) => {
			return {
				...state,
				currency: action.payload,
			};
		},
	},
});

export const { changeAccount, changeToken, updateAccount, changeCurrency } = accountSlice.actions;
export default accountSlice.reducer;
