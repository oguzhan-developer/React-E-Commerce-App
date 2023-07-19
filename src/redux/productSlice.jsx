import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const BASE_URL = "http://localhost:3004/products";

export const addProductsFromDB = createAsyncThunk("addProductsFromDB", async () => {
  const response = await fetch(BASE_URL);
  return await response.json();
});

const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    api: {
      isLoading: false,
      error:null
    },
  },
  reducers: {},
  extraReducers(builder) {

    builder.addCase(addProductsFromDB.pending, (state) => {
      state.api.isLoading = true;
    })

    .addCase(addProductsFromDB.rejected, (state, action) => {
      state.api.error = `${action.error.name} ${action.error.message}`
      state.api.isLoading = false;
    })

    .addCase(addProductsFromDB.fulfilled, (state, action) => {
      state.items = action.payload;
      state.api.isLoading = false;
      state.api.error = null;
    })
  },
});
export const useIsLoading = state => state.product.api.isLoading
export const useProducts = (state) => state.product.items;
export const { addProducts } = productSlice.actions;
export default productSlice.reducer;
