import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  school: null,
  currentSection: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setSchool: (state, action) => {
      state.school = action.payload.school;
    },
    setCurrentSection: (state, action) => {
      state.currentSection = action.payload.currentSection;
    },
  },
});

export const { setLogin, setLogout, setSchool, setCurrentSection } = authSlice.actions;
export default authSlice.reducer;
