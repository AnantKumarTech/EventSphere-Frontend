import { createSlice } from "@reduxjs/toolkit";

const favoriteSlice = createSlice({
  name: "favorites",
  initialState: {
    items: JSON.parse(localStorage.getItem("data"))||[]
  },
  reducers: {
    toggleFavorites(state, action) {
      const event=action.payload;
      const seletedFavorite=state.items.find((e)=>{
      return ( e.id||e._id)===(event.id||event._id);
  
      })
      if (seletedFavorite){
       state.items=state.items.filter((e)=>{
        return (e._id || e.id) !== (event.id || event._id);
       })
      } 
      else{
      state.items.push(action.payload);
      }
      localStorage.setItem("data", JSON.stringify(state.items));

    },
    removeFavorites(state) {},
    clearFavorties(state) {
      state.items=[];
    },
  },
});

export const { toggleFavorites, removeFavorites, clearFavorties } =
  favoriteSlice.actions;

export default favoriteSlice.reducer;
