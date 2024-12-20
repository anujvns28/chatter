import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null,
  authLoading: false,
  token: localStorage.getItem("token")
    ? JSON.parse(localStorage.getItem("token"))
    : null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, value) {
      state.user = value.payload;
    },
    setAuthLoading(state, value) {
      state.authLoading = value.payload;
    },
    setToken(state, value) {
      state.token = value.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser, setAuthLoading, setToken } = authSlice.actions;

export default authSlice.reducer;
