import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ProductDataService from "../../services/product.service";

export interface ProductInitialState {
  product?: any[]; // data stored from API
  status: "idle" | "loading" | "succeeded" | "failed";
  error?: string; // current active car tab index
}

const initialState: ProductInitialState = {
  product: [],
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
        state.product = action.payload;
      })
      .addCase(retrieveTutorials.rejected, (state, action) => {
        state.status = "failed";
        state.error = action?.error?.message;
      });
  },
});

export default productSlice;
