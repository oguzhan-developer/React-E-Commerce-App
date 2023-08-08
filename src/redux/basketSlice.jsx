import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { db } from "../firebase";
import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";

const DB_USER = import.meta.env.VITE_DB_USER;

export const addBasket = createAsyncThunk(
  "addBasket",
  async ({ uid, product }) => {
    const userRef = doc(db, DB_USER, uid);

    await updateDoc(userRef, {
      basket: arrayUnion(product),
    });
  }
);

export const getBasketLength = createAsyncThunk(
  "getBasketLength",
  async ({ uid }) => {
    const docRef = doc(db, DB_USER, uid);
    const basketDoc = await getDoc(docRef);
    if (basketDoc.exists()) {
      const basketItems = basketDoc.data().basket;
      return basketItems.length;
    }
  }
);

const basketSlice = createSlice({
  name: "basket",
  initialState: {
    items: [],
    length: null,
    error: null,
  },
  reducers: {
  },
  extraReducers(builder) {
    builder
      .addCase(addBasket.fulfilled, (state) => {
        state.length += 1;
        state.error = null
      })
      .addCase(addBasket.rejected, (state, action) => {
        state.error = `${action.error.name} ${action.error.message}`;
      })

      .addCase(getBasketLength.fulfilled, (state, action) => {
        state.length = action.payload;
      })
      .addCase(getBasketLength.rejected, (state, action) => {
        state.error = `${action.error.name} ${action.error.message}`;
      });
  },
});
export const useBasketLength = state => state.basket.length
export const {} = basketSlice.actions
export default basketSlice.reducer;
