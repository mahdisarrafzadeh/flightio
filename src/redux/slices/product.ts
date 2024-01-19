import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { ProductInitialState } from "@/interfaces/product.interfaces";
import {
  deleteProductById,
  retrieveProductById,
  retrieveProducts,
  updateProduct,
} from "./service";

export const initialState: ProductInitialState = {
  products: undefined,
  productDetail: undefined,
  status: "idle",
  error: undefined,
  deleteLoading: false,
  updateLoading: false,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    sortProducts: (state, action: PayloadAction<string>) => {
      action.payload;
      state.products &&
        state.products.sort((a, b) => {
          if (a.price && b.price) {
            return action.payload === "cheapest"
              ? a.price - b.price
              : b.price - a.price;
          }
          return a.price ? -1 : b.price ? 1 : 0;
        });
    },
  },
  extraReducers(builder) {
    builder
      .addCase(retrieveProducts.pending, (state) => {
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
      .addCase(retrieveProductById.pending, (state) => {
        state.status = "loading";
        state.productDetail = undefined;
      })
      .addCase(retrieveProductById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.productDetail = action.payload;
      })
      .addCase(retrieveProductById.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(deleteProductById.pending, (state) => {
        state.deleteLoading = true;
      })
      .addCase(deleteProductById.fulfilled, (state) => {
        state.deleteLoading = false;
        state.productDetail = undefined;
      })
      .addCase(deleteProductById.rejected, (state) => {
        state.deleteLoading = false;
      })
      .addCase(updateProduct.pending, (state) => {
        state.updateLoading = true;
      })
      .addCase(updateProduct.fulfilled, (state) => {
        state.updateLoading = false;
      })
      .addCase(updateProduct.rejected, (state) => {
        state.updateLoading = false;
      });
  },
});

export const { sortProducts } = productSlice.actions;

export const selectProduct = (state: RootState) => state.products;

export default productSlice.reducer;
