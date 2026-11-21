import { configureStore } from "@reduxjs/toolkit";
import favoriteSlice from "./slices/favoriteSlice";
import filterReducer from "./slices/filterSlice";

export const store = configureStore({
  reducer: {
    favorite: favoriteSlice,
    filters: filterReducer,
  },
});