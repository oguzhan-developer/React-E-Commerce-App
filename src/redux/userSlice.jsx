import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "../firebase";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import getUID from "../utilities/getUID";
import { alertSuccesLogin, alertSuccesRegister } from "../utilities/Alerts";
const DB_USER = import.meta.env.VITE_DB_USER;

const defaultUserStructure = (uid, name, email, password) => {
  return {
    uid,
    name,
    email,
    password,
    favorites: [],
    basket: [],
  };
};

export const registerUser = createAsyncThunk(
  "registerUser",
  async ({ name, email, password }) => {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    ); // Added user to auth.

    //then add user to firestore database
    const user = userCredential.user;
    const uid = user.uid;

    await setDoc(doc(db, DB_USER, uid), defaultUserStructure(uid,name,email,password));

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

export const getUserByID = createAsyncThunk("getUserByToken", async () => {
  const userId = getUID();
  const querySnapshot = await getDocs(
    collection(db, import.meta.env.VITE_DB_USER)
  );
  return { data: querySnapshot, userId };
});

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
        const uid = action.payload.uid;
        const name = action.payload.name;
        const email = action.payload.email;
        state.user = {
          uid,
          name,
          email,
        };
        alertSuccesRegister(name);
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
        localStorage.setItem("token", action.payload.accessToken);
        alertSuccesLogin();
        setTimeout(() => (window.location.href = "/"), 1000);
      })

      .addCase(getUserByID.pending, (state) => {
        state.getUser.isLoading = true;
      })
      .addCase(getUserByID.rejected, (state, action) => {
        state.getUser.isLoading = false;
        state.getUser.error = `${action.error.name} ${action.error.message}`;
        state.user = null; //expired acces token
      })
      .addCase(getUserByID.fulfilled, (state, action) => {
        const users = action.payload.data;
        const userId = action.payload.userId;
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
