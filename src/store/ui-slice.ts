import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type DialogType =
	| ""
	| "transaction_details"
	| "fund_wallet"
	| "funding_receipt"
	| "withdrawal"
	| "withdrawal_receipt"
	| "notifications"
	| "set_pin";
export type DialogPayload = {
	id: string;
	show: boolean;
	type: DialogType;
};

type UiState = {
	dialog: DialogPayload;
};

const initialState: UiState = {
	dialog: {
		id: "",
		show: false,
		type: "",
	},
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
	},
});

export const { changeDialog } = uiSlice.actions;
export default uiSlice.reducer;
