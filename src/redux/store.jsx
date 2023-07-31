import { configureStore } from "@reduxjs/toolkit";
import  productSlice  from "./productSlice";
import userSlice from "./userSlice";
import favoriteSlice from "./favoriteSlice";

export const store = configureStore({
    reducer:{
        product: productSlice,
        user: userSlice,
        favorite:favoriteSlice
    }
})