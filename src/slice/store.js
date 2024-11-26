import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../slice/authSlice";
import chatSlice from "../slice/chatSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    chat: chatSlice,
  },
});
