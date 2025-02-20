import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type DialogType =
  | ""
  | "success_dialog"
  | "insufficient_funds"
  | "transaction_details"
  | "fund_wallet"
  | "funding_receipt"
  | "withdrawal"
  | "withdrawal_receipt"
  | "notifications"
  | "enter_pin"
  | "set_pin"
  | "fund_vault"
  | "vault_withdrawal"
  | "real-estate-purchase-success"
  | "real-estate-marketplace-purchase"
  | "real-estate-marketplace-purchase-preview"
  | "real-estate-marketplace-purchase-success"
  | "vault_transaction_details"
  | "verify_bvn_success"
  | "verify_bvn_failed"
  | "add_new_bank"
  | "remove_bank"
  | "add_new_card"
  | "remove_card";


export type DialogPayload = {
  id: string;
  show: boolean;
  type: DialogType;
  data: Record<string, any> | null;
  action: ((payload?: any) => Promise<void> | void) | null;
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
    action: null,
    data: null,
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
