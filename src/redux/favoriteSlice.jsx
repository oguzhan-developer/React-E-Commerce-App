import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const addFavorite = createAsyncThunk("addFavorite", async ({userId, product}) => {
    const prevData = await axios(`${import.meta.env.VITE_BASE_ENDPOINT}/${import.meta.env.VITE_DB_FAVORITE}/${userId}`)
    const prevFavorites = prevData.data.favorites
    const newFavorites = prevFavorites.push(product)
    const response = await axios.post(
    `${import.meta.env.VITE_BASE_ENDPOINT}/${import.meta.env.VITE_DB_FAVORITE}/${userId}`
 , { favorites: [newFavorites]});

    return response.data
});

const favoriteSlice = createSlice({
  name: "favorites",
  initialState: {},
  reducers: {},
});

export default favoriteSlice.reducer;
