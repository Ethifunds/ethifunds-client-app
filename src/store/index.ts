import { variables } from "@/constants";
import { configureStore, Tuple } from "@reduxjs/toolkit";
import accountSlice from "./account-slice";
const store = configureStore({
	reducer: {
		account: accountSlice,
	},
	devTools: variables.NODE_ENV === "development",
	middleware: () => new Tuple(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
