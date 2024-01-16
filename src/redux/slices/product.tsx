import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ProductDataService from "../../services/product.service";
import { RootState } from "../store";
import { ProductInitialState } from "@/interfaces/product.interfaces";

const initialState: ProductInitialState = {
  products: [],
  productDetail: undefined,
  status: "idle",
  error: undefined,
};

export const retrieveProducts = createAsyncThunk(
  "products/retrieve",
  async () => {
    const res = await ProductDataService.getAll();
    return res.data;
  }
);

export const retrieveProductById = createAsyncThunk(
  "productDetail/retrieve",
  async (id: number) => {
    const res = await ProductDataService.getById(id);
    return res.data;
  }
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    // omit existing reducers here
  },
  extraReducers(builder) {
    builder
      .addCase(retrieveProducts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(retrieveProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(retrieveProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action?.error?.message;
      })
      .addCase(retrieveProductById.pending, (state, action) => {
        state.status = "loading";
        state.productDetail = undefined;
      })
      .addCase(retrieveProductById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.productDetail = action.payload;
      });
  },
});

export const selectProduct = (state: RootState) => state.products;

export default productSlice.reducer;
