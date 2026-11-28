import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filters",
  initialState: {
    search: "",
    format: "",
    isPaid: "",
    category: "",
  },
  reducers: {
    setFormat(state, action) {
      state.format = action.payload;
    },
    setIsPaid(state, action) {
      state.isPaid = action.payload;
    },
    
    setCategory(state, action) {
      state.category = action.payload;
    },
  },
});

export const { setFormat, setCategory, setIsPaid } = filterSlice.actions;

export default filterSlice.reducer;
