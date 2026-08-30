import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import checkoutService from "../../service/checkoutService.js";

export const checkoutProducts = createAsyncThunk(
  "checkout/checkoutProducts",

  async (productIds, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;

      return await checkoutService.checkout(productIds, token);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const initialState = {
  loading: false,
  success: false,
  error: null,
};

const checkoutSlice = createSlice({
  name: "checkout",

  initialState,

  reducers: {
    resetCheckoutState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(checkoutProducts.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })

      .addCase(checkoutProducts.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.error = null;
      })

      .addCase(checkoutProducts.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      });
  },
});

export const { resetCheckoutState } = checkoutSlice.actions;

export default checkoutSlice.reducer;