import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const BASE_URL = "http://localhost:3004/products";

export const addProductsFromDB = createAsyncThunk(
  "addProductsFromDB",
  async () => {
    const response = await fetch(BASE_URL);
    return await response.json();
  }
);

export const getProductById = createAsyncThunk("getProductById", async (id) => {
  const response = await fetch(`${BASE_URL}/${id}`);
  return await response.json();
});

const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    detailItem: {
      item: null,
      isLoading: false,
      error: null,
    },
    api: {
      isLoading: false,
      error: null,
    },
  },
  reducers: {
    setDetailItem: (state, action) => {
      state.detailItem.item = action.payload
    },
    resetDetailItem: (state) => {
      state.detailItem.item = null;
    }
  },
  extraReducers(builder) {
    //Add Products From DB
    builder
      .addCase(addProductsFromDB.pending, (state) => {
        state.api.isLoading = true;
      })

      .addCase(addProductsFromDB.rejected, (state, action) => {
        state.api.error = `${action.error.name} ${action.error.message}`;
        state.api.isLoading = false;
      })

      .addCase(addProductsFromDB.fulfilled, (state, action) => {
        state.items = action.payload;
        state.api.isLoading = false;
        state.api.error = null;
      })

      //Get Products By ID
      .addCase(getProductById.pending, (state) => {
        state.detailItem.isLoading = true;
      })

      .addCase(getProductById.rejected, (state, action) => {
        state.detailItem.error = `${action.error.name} ${action.error.message}`;
        state.detailItem.isLoading = false;
      })

      .addCase(getProductById.fulfilled, (state, action) => {
        state.detailItem.item = action.payload;
        state.detailItem.isLoading = false;
        state.detailItem.error = null;
      });
  },
});
export const useDetailProduct = state => state.product.detailItem.item;
export const useIsLoading = (state) => state.product.api.isLoading;
export const useProducts = (state) => state.product.items;
export const { setDetailItem, resetDetailItem } = productSlice.actions;
export default productSlice.reducer;
