import {
  Notification,
  NotificationDataTypes,
} from "@/types/notification.types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type MarkIsRead = { id: number };

type NotificationState = {
  notifications: Notification[];
  type: NotificationDataTypes | "info" | "notifications" | "";
  id: string;
  data: any;
};

export type ChangeNotificationDialog = Partial<{
  type: NotificationState["type"];
  id: NotificationState["id"];
  data: NotificationState["data"];
}>;

const initialState: NotificationState = {
  notifications: [],
  type: "",
  id: "",
  data: null,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    addNotification: (state, action: PayloadAction<Notification[]>) => {
      const originals = state.notifications.map((item) => item.id);
      const updates = action.payload.filter(
        (item) => !originals.includes(item.id),
      );

      return {
        ...state,
        notifications: [...updates, ...state.notifications],
      };
    },

    markIsRead: (state, action: PayloadAction<MarkIsRead>) => {
      const match = state.notifications.find(
        (item) => item.id === action.payload.id,
      );
      if (match) {
        match.read_at = new Date().toISOString();
      }
    },

    changeNotificationDialog: (
      state,
      action: PayloadAction<ChangeNotificationDialog>,
    ) => {
      return {
        ...state,
        type: action.payload.type ?? state.type,
        id: action.payload.id ?? state.id,
        data: action.payload.data ?? state.data,
      };
    },

    resetNotificationDialog: (state) => {
      return {
        ...state,
        type: "",
        id: "",
        data: null,
      };
    },
  },
});

export const {
  addNotification,
  markIsRead,
  changeNotificationDialog,
  resetNotificationDialog,
} = notificationSlice.actions;
export default notificationSlice.reducer;
