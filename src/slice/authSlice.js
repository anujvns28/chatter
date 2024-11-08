import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: true,
  authLoading: false,
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
  },
});

// Action creators are generated for each case reducer function
export const { setUser, setAuthLoading } = authSlice.actions;

export default authSlice.reducer;
