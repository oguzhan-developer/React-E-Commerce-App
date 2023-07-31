import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";
import axios from "axios";
import jwtDecode from "jwt-decode";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "../firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";

const BASE_URL = import.meta.env.VITE_BASE_ENDPOINT;
const DB_USER = import.meta.env.VITE_DB_USER;

export const registerUser = createAsyncThunk(
  "registerUser",
  async ({ name, email, password }) => {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    const uid = user.uid;
    localStorage.setItem("token", user.accessToken);
    try {
      const docRef = await addDoc(collection(db, "users"), {
        uid,
        name,
        email,
        password,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    return { accessToken: user.accessToken, uid, name, email };
  }
);

export const loginUser = createAsyncThunk(
  "loginUser",
  async ({ email, password }) => {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    return user;
  }
);

export const getUserByToken = createAsyncThunk(
  "getUserByToken",
  async (userToken) => {
    const decodedUser = jwtDecode(userToken);
    const userId = decodedUser.sub;
    const querySnapshot = await getDocs(collection(db, "users"));
    return {data: querySnapshot, userId};
  }
);


const userSlice = createSlice({
  name: "user",

  initialState: {
    user: null,
    register: {
      isLoading: false,
      error: null,
    },
    login: {
      isLoading: false,
      error: null,
    },
    getUser: {
      isLoading: false,
      error: null,
    },
    favorites: [],
  },
  reducers: {
    resetUser: (state) => {
      state.user = null;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers(builder) {
    builder

      .addCase(registerUser.pending, (state) => {
        state.register.isLoading = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.register.isLoading = false;
        state.register.error = `${action.error.name} ${action.error.message}`;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.register.isLoading = false;
        state.register.error = null;
        localStorage.setItem("token", action.payload.accessToken);
        state.user = {
          uid: action.payload.uid,
          name: action.payload.name,
          email: action.payload.email,
        };
      })

      .addCase(loginUser.pending, (state) => {
        state.login.isLoading = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.login.isLoading = false;
        state.login.error = `${action.error.name} ${action.error.message}`;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.login.isLoading = false;
        state.login.error = null;
        console.log(action.payload);
        localStorage.setItem("token", action.payload.accessToken);
      })

      .addCase(getUserByToken.pending, (state) => {
        state.getUser.isLoading = true;
      })
      .addCase(getUserByToken.rejected, (state, action) => {
        state.getUser.isLoading = false;
        state.getUser.error = `${action.error.name} ${action.error.message}`;
        state.user = null; //expired acces token
      })
      .addCase(getUserByToken.fulfilled, (state, action) => {
        const users = action.payload.data
        const userId = action.payload.userId
        users.forEach((user) => {
          let data = user.data();
          if (userId == data.uid) {
            state.user = data;
          }
        });
        state.getUser.isLoading = false;
        state.getUser.error = null;
      });
  },
});
export const useUser = (state) => state.user.user;
export const useGetUserIsLoading = (state) => state.user.getUser.isLoading;
export const useRegisterIsLoading = (state) => state.user.register.isLoading;
export const { resetUser, setUser } = userSlice.actions;
export default userSlice.reducer;
