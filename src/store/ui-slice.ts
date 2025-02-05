import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type DialogType =
	| ""
	| "transaction_details"
	| "fund_wallet"
	| "funding_receipt"
	| "withdrawal"
	| "withdrawal_receipt"
	| "notifications"
	| "set_pin"
	| "fund_vault"
	| "vault_withdrawal"
	| "vault_transaction_details";

export type DialogPayload = {
	id: string;
	show: boolean;
	type: DialogType;
};

export type BackBtnPayload = {
	show: boolean;
	text?: string;
	action?: () => void;
	icon?: string;
	className?: string;
};

type UiState = {
	dialog: DialogPayload;
	pageTitle: string;
	backBtn: BackBtnPayload | null;
};

const initialState: UiState = {
	dialog: {
		id: "",
		show: false,
		type: "",
	},
	pageTitle: "",
	backBtn: null,
};

const uiSlice = createSlice({
	name: "ui",
	initialState,
	reducers: {
		changeDialog: (state, action: PayloadAction<Partial<DialogPayload>>) => {
			return {
				...state,
				dialog: { ...state.dialog, ...action.payload },
			};
		},
		changePageTitle: (state, action: PayloadAction<string>) => {
			return {
				...state,
				pageTitle: action.payload,
			};
		},
		changeBackBtn: (state, action: PayloadAction<BackBtnPayload | null>) => {
			return {
				...state,
				backBtn: action.payload,
			};
		},
	},
});

export const { changeDialog, changePageTitle, changeBackBtn } = uiSlice.actions;
export default uiSlice.reducer;
