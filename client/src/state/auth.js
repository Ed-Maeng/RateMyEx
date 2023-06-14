import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  school: null,
  schoolName: "",
  currentSection: null,
  tab: false,
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
    setUser: (state, action) => {
      state.user = action.payload.user;
    },
    setSchool: (state, action) => {
      state.school = action.payload.school;
      state.schoolName = action.payload.schoolName;
    },
    setCurrentSection: (state, action) => {
      state.currentSection = action.payload.currentSection;
    },
    setTab: (state, action) => {
      state.tab = action.payload.tab;
    },
  },
});

export const { setLogin, setLogout, setUser, setSchool, setCurrentSection, setTab } = authSlice.actions;
export default authSlice.reducer;
