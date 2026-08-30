import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "../../service/authService";

const storedAuth = localStorage.getItem('auth')
const parsedAuth = storedAuth?JSON.parse(storedAuth):null

const initialState = {
  user: parsedAuth?.user || null,
  token: parsedAuth?.token || null,
  isAuthenticated: !!parsedAuth?.token,
  loading: false,
  error: null,
};

export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData, thunkAPI) => {
    try {
      return await authService.register(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (Credential, thunkAPI) => {
    try {
      return await authService.login(Credential);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
      localStorage.removeItem("auth");
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(registerUser.pending, (state) => {
        ((state.loading = true), (state.error = null));
      })
      .addCase(registerUser.fulfilled, (state) => {
        ((state.loading = false), (state.error = null));
      })
      .addCase(registerUser.rejected, (state, action) => {
        ((state.loading = false), (state.error = action.payload));
      })

      .addCase(loginUser.pending, (state) => {
        ((state.loading = true), (state.error = null));
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        ((state.loading = false),
          (state.user = action.payload.data.user),
          (state.token = action.payload.data.token),
          (state.isAuthenticated = true),
          (state.error = null));
        localStorage.setItem(
          "auth",
          JSON.stringify({
            user: action.payload.data.user,
            token: action.payload.data.token,
          }),
        );
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
