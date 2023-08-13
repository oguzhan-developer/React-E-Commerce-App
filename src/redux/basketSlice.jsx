import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { db } from "../firebase";
import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import { alertAddBasketReject, alertAddBasketSucces } from "../utilities/Alerts";

const DB_USER = import.meta.env.VITE_DB_USER;

export const addBasket = createAsyncThunk(
  "addBasket",
  async ({ uid, product,basketItems }) => {

    const filteredItems =  await basketItems.filter((item) => {
      return item.id == parseInt(product.id);
    });
    if (filteredItems.length > 0 )throw new Error('Urun zaten ekli!');
    else {
      const userRef = doc(db, DB_USER, uid);

      await updateDoc(userRef, {
        basket: arrayUnion(product),
      });
      return product;
    }

  }
);

export const getBasket = createAsyncThunk("getBasket", async ({ uid }) => {
  const docRef = doc(db, DB_USER, uid);
  const basketDoc = await getDoc(docRef);
  if (basketDoc.exists()) {
    const basketItems = basketDoc.data().basket;
    return basketItems;
  }
});

const basketSlice = createSlice({
  name: "basket",
  initialState: {
    items: [],
    length: null,
    error: null,
    isInTheBasket: null,
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(addBasket.fulfilled, (state, action) => {
        state.error = null;
        state.items = [...state.items, action.payload];
        state.isinthebasket = true;
        state.length += 1;
        alertAddBasketSucces();
      })
      .addCase(addBasket.rejected, (state, action) => {
        state.error = `${action.error.name} ${action.error.message}`;
        alertAddBasketReject()
        // setInterval(()=> window.location.href = import.meta.env.VITE_PAGE_BASKET,900)
        
      })

      .addCase(getBasket.fulfilled, (state, action) => {
        state.items = action.payload;
        state.length = action.payload.length
      })
  },
});
export const useBasketLength = (state) => state.basket.length;
export const useBasketItems = (state) => state.basket.items;
export const {} = basketSlice.actions;
export default basketSlice.reducer;
