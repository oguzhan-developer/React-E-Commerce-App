import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  getDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { useSelector } from "react-redux";
const DB_USER = import.meta.env.VITE_DB_USER;
export const addFavoriteById = createAsyncThunk(
  "addFavoriteById",
  async ({ uid, product }) => {
    console.log(uid);
    if (!uid) return;
    const userRef = doc(db, DB_USER, uid);
    await updateDoc(userRef, {
      favorites: arrayUnion(product),
    });
  }
);
export const deleteFavoriteById = createAsyncThunk(
  "deleteFavoriteById",
  async ({ uid, product }) => {
    if (!uid) return;
    const userRef = doc(db, DB_USER, uid);
    await updateDoc(userRef, {
      favorites: arrayRemove(product),
    });
  }
);

export const isFavoritedItem = createAsyncThunk(
  "isFavoritedItem",
  async ({ uid, productId }) => {
    if (!uid) return false;
    const docRef = doc(db, DB_USER, uid);
    const favoritedItemsDoc = await getDoc(docRef);
    let isFavorited = false;

    if (favoritedItemsDoc.exists()) {
      const favoritedItems = favoritedItemsDoc.data().favorites;

      favoritedItems.forEach((favoritedItem) => {
        if (favoritedItem.id == productId) isFavorited = true;
      });
    }
    return isFavorited;
  }
);

const favoriteSlice = createSlice({
  name: "favorites",
  initialState: {
    isLoading: false,
    error: null,
    isFavoritedItem: false,
  },
  reducers: {
    setFavorite: (state, action) => {
      state.isFavoritedItem = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(addFavoriteById.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addFavoriteById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = `${action.error.name} ${action.error.message}`;
      })
      .addCase(addFavoriteById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.isFavoritedItem = !state.isFavoritedItem
      })

      .addCase(isFavoritedItem.fulfilled, (state, action) => {
        state.isFavoritedItem = action.payload;
      })
      .addCase(isFavoritedItem.rejected, (state, action) => {
        state.isLoading = false;
        state.error = `${action.error.name} ${action.error.message}`;
      })

      .addCase(deleteFavoriteById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = `${action.error.name} ${action.error.message}`;
      })
      .addCase(deleteFavoriteById.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteFavoriteById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.isFavoritedItem = !state.isFavoritedItem

      });
  },
});
export const { setFavorite } = favoriteSlice.actions;
export const useIsFavoritedItem = (state) => state.favorite.isFavoritedItem;
export default favoriteSlice.reducer;
