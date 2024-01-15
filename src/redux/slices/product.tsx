import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ProductDataService from "../../services/product.service";
import { RootState } from "../store";
import { ProductInitialState } from "@/interfaces/product.interfaces";

const initialState: ProductInitialState = {
  products: [],
  status: "idle",
  error: undefined,
};

export const retrieveTutorials = createAsyncThunk(
  "tutorials/retrieve",
  async () => {
    const res = await ProductDataService.getAll();
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
      .addCase(retrieveTutorials.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(retrieveTutorials.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(retrieveTutorials.rejected, (state, action) => {
        state.status = "failed";
        state.error = action?.error?.message;
      });
  },
});

export const selectProduct = (state: RootState) => state.products;

export default productSlice.reducer;
