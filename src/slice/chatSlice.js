import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentChat: null,
  searchUsers: false,
  userLoading: false,
  showNotifaction: false,
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setCurrentChat(state, value) {
      state.currentChat = value.payload;
    },
    setOpenSearchBox(state, value) {
      state.searchUsers = value.payload;
    },
    setUserLoading(state, value) {
      state.userLoading = value.payload;
    },
    setShowNotification(state, value) {
      state.showNotifaction = value.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setCurrentChat,
  setOpenSearchBox,
  setUserLoading,
  setShowNotification,
} = chatSlice.actions;

export default chatSlice.reducer;
