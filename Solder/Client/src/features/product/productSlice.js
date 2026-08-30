import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import productService from "../../service/productService";

const initialState = {
  products: [],
  myProducts: [],
  loading: false,
  error: null,
};

export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (productData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;

      console.log("Token", token);
      return await productService.createProduct(productData, token);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const fetchMyProducts = createAsyncThunk(
  "products/fetchMyProducts",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;

      return await productService.getMyProducts(token);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",

  async (filters = {}, thunkAPI) => {
    try {
      return await productService.getProducts(filters);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

const productSlice = createSlice({
  name: "products",
  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(createProduct.pending, (state) => {
        ((state.loading = true), (state.error = null));
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        ((state.loading = false), state.products.push(action.payload));
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload || "Failed to create product";
      })
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;

        state.products = action.payload;
      })

      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      })
      .addCase(fetchMyProducts.pending, (state) => {
        ((state.loading = true), (state.error = null));
      })
      .addCase(fetchMyProducts.fulfilled, (state, action) => {
        ((state.loading = false), (state.myProducts = action.payload));
      })
      .addCase(fetchMyProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default productSlice.reducer;
