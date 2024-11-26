import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentChat: null,
  searchUsers: false,
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
  },
});

// Action creators are generated for each case reducer function
export const { setCurrentChat, setOpenSearchBox } = chatSlice.actions;

export default chatSlice.reducer;
