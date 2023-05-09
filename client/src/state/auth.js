import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  school: null,
  reviewSection: null,
  sections: [],
  reviews: [],
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
    setSections: (state, action) => {
      state.sections = action.payload.sections;
    },
    setReviewSection: (state, action) => {
      state.reviewSection = action.payload.reviewSection;
    },
    setReviews: (state, action) => {
      state.reviews = action.payload.reviews;
    },
  },
});

export const { setLogin, setLogout, setSchool, setSections, setReviewSection, setReviews } = authSlice.actions;
export default authSlice.reducer;
