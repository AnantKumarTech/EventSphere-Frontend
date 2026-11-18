import { createSlice } from "@reduxjs/toolkit";

const favoriteSlice = createSlice({
  name: "favorites",
  initialState: {
    name: "anant",
  },
  reducers: {
    toggleFavorites(state, action) {
      state.name = action.payload;
    },
    removeFavorites(state) {},
    clearFavorties(state) {},
  },
});

export const { toggleFavorites, removeFavorites, clearFavorties } =
  favoriteSlice.actions;

export default favoriteSlice.reducer;
