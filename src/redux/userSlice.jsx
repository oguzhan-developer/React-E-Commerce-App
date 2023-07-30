import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";
import axios from "axios";
import jwtDecode from "jwt-decode";

const BASE_URL = import.meta.env.VITE_BASE_ENDPOINT;
const DB_USER = import.meta.env.VITE_DB_USER;
export const registerUser = createAsyncThunk("registerUser", async (user) => {
  const response = await axios.post(`${BASE_URL}/register`, {
    id: nanoid(),
    name: user.name,
    email: user.email,
    password: user.password,
  });
  return await response.data;
});

export const loginUser = createAsyncThunk("loginUser", async (user) => {
  const response = await axios.post(`${BASE_URL}/login/`, {
    email: user.email,
    password: user.password,
  });
  return response.data;
});

export const getUserByToken = createAsyncThunk(
  "getUserByToken",
  async (userToken) => {
    const decodedUser = jwtDecode(userToken);
    const id = decodedUser.sub;
    const response = await axios(`${BASE_URL}${DB_USER}${id}`);
    return response.data;
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
        window.location.href = "/";
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
        window.location.href = "/";
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
        state.getUser.isLoading = false;
        state.getUser.error = null;
        state.user = action.payload;
      });
  },
});
export const useUser = (state) => state.user.user;
export const useRegisterIsLoading = (state) => state.user.register.isLoading;
export const { resetUser, setUser } = userSlice.actions;
export default userSlice.reducer;
