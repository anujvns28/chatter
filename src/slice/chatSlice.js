import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentChat: null,
  searchUsers: false,
  userLoading: false,
  showNotifaction: false,
  notificationCaount: 0,
  unReadMessagess: 4,
  showGroupCreationModal: false,
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
    setNotifactionCount(state, value) {
      state.notificationCaount = value.payload;
    },
    setUnReadMessagessCount(state, value) {
      state.unReadMessagess = value.payload;
    },
    setShowGroupCreationModal(state, value) {
      state.showGroupCreationModal = value.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setCurrentChat,
  setOpenSearchBox,
  setUserLoading,
  setShowNotification,
  setNotifactionCount,
  setUnReadMessagessCount,
  setShowGroupCreationModal,
} = chatSlice.actions;

export default chatSlice.reducer;
