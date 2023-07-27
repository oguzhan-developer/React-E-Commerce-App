import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice(
    {
        name:"user",
        initialState:{
            user: null,
            favorites:[]
        },
        reducers:{
            favorite: (state, action) => {

            }
        }
    }
)
export const {favorite} = userSlice.actions
export default userSlice.reducer;