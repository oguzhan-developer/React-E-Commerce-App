import { configureStore } from "@reduxjs/toolkit";
import  productSlice  from "./productSlice";
import userSlice from "./userSlice";
import favoriteSlice from "./favoriteSlice";
import basketSlice from "./basketSlice";

export const store = configureStore({
    reducer:{
        product: productSlice,
        user: userSlice,
        favorite:favoriteSlice,
        basket:basketSlice
    }
})