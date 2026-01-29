// import { createSlice } from "@reduxjs/toolkit";

// const commentSlice = createSlice({
//   name: "comment",
//   initialState: {
//     loading: false,
//     comment: "",
//   },
//   reducers: {
//     //actions
//     setLoading: (state, action) => {
//       state.loading = action.payload;
//     },
//     setComment: (state, action) => {
//       state.comment = action.payload;
//     },
//   },
// });
// export const { setLoading, setComment } = commentSlice.actions;
// export default commentSlice.reducer;


// commentSlice.js
import { createSlice } from "@reduxjs/toolkit";

const commentSlice = createSlice({
  name: "comment",
  initialState: {
    loading: false,
    comment: [], // Change from "" to []
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setComment: (state, action) => {
      state.comment = action.payload; // This should be an array
    },
  },
});

export const { setLoading, setComment } = commentSlice.actions;
export default commentSlice.reducer;