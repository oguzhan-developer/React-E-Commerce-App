import { createSlice } from "@reduxjs/toolkit";

 const productSlice = createSlice({
  name: "products",
  initialState: { items: [] },
  reducers: {
    addProducts: (state, action) => {
        state.items = action.payload
        console.log(state.items);
    }
  },
});
export const useProducts = state => state.product.items;
export const {addProducts} = productSlice.actions;
export default productSlice.reducer;