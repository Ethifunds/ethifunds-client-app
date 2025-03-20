import { variables } from "@/constants";
import { configureStore, Tuple } from "@reduxjs/toolkit";
import uiSlice from "./ui-slice";
import accountSlice from "./account-slice";
import notificationSlice from "./notification-slice";
const store = configureStore({
  reducer: {
    ui: uiSlice,
    account: accountSlice,
    notification: notificationSlice,
  },
  devTools: variables.NODE_ENV === "development",
  middleware: () => new Tuple(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
