import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const DB_PRODUCT = import.meta.env.VITE_DB_PRODUCT;
const pageLenght = 12;

export const getProductsFromDB = createAsyncThunk(
  "getProductsFromDB",
  async (page) => {
    const querySnapshot = await getDocs(collection(db, DB_PRODUCT));
    let products = []
    querySnapshot.forEach((doc) => {
      products.push(doc.data())
    });
    return products
  }
);

export const getProductById = createAsyncThunk("getProductById", async (id) => {
  const querySnapshot = await getDocs(collection(db, DB_PRODUCT));
  let product = {}
  querySnapshot.forEach((doc) => {
    if(doc.data().id == id)product = doc.data()
  });
  return product
});

const productSlice = createSlice({
  name: "products",
  initialState: {
    page: {
      index: 1,
      isLastPage: false,
    },
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
    nextPage: (state) => {
      state.page.index += 1;
    },
    setDetailItem: (state, action) => {
      state.detailItem.item = action.payload;
    },
    resetDetailItem: (state) => {
      state.detailItem.item = null;
    },
  },
  extraReducers(builder) {
    //Add Products From DB
    builder
      .addCase(getProductsFromDB.pending, (state) => {
        state.api.isLoading = true;
      })

      .addCase(getProductsFromDB.rejected, (state, action) => {
        state.api.error = `${action.error.name} ${action.error.message}`;
        state.api.isLoading = false;
      })

      .addCase(getProductsFromDB.fulfilled, (state, action) => {
        const products = action.payload;
        if (products.length != 0) {
          state.items = products;
        } else state.page.isLastPage = true;
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
        state.detailItem.item = null;
      })

      .addCase(getProductById.fulfilled, (state, action) => {
        state.detailItem.item = action.payload;
        state.detailItem.isLoading = false;
        state.detailItem.error = null;
      });
  },
});
export const usePage = (state) => state.product.page.index;
export const useIsLastPage = (state) => state.product.page.isLastPage;
export const useDetailProduct = (state) => state.product.detailItem.item;
export const useDetailError = (state) => state.product.detailItem.error;
export const useDetailIsLoading = (state) => state.product.detailItem.isLoading;
export const useIsLoading = (state) => state.product.api.isLoading;
export const useProducts = (state) => state.product.items;
export const { setDetailItem, resetDetailItem, nextPage } =
  productSlice.actions;
export default productSlice.reducer;
