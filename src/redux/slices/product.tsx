import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ProductDataService from "../../services/product.service";
import { RootState } from "../store";
import {
  IFormInput,
  ProductInitialState,
} from "@/interfaces/product.interfaces";

const initialState: ProductInitialState = {
  products: [],
  productDetail: undefined,
  status: "idle",
  error: undefined,
  deleteLoading: false,
};

export const retrieveProducts = createAsyncThunk(
  "products/retrieve",
  async () => {
    const res = await ProductDataService.getAll();
    return res.data;
  }
);

export const retrieveProductById = createAsyncThunk(
  "products/retrieveProductById",
  async (id: number) => {
    const res = await ProductDataService.getById(id);
    return res.data;
  }
);

export const deleteProductById = createAsyncThunk(
  "products/delete",
  async (id: number) => {
    const res = await ProductDataService.delete(id);
    return res.data;
  }
);

export const updateProduct = createAsyncThunk(
  "products/update",
  async (data: IFormInput) => {
    const res = await ProductDataService.update(data);
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
      })
      .addCase(retrieveProductById.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(deleteProductById.pending, (state, action) => {
        state.deleteLoading = true;
        state.productDetail = undefined;
      })
      .addCase(deleteProductById.fulfilled, (state, action) => {
        state.deleteLoading = false;
      })
      .addCase(deleteProductById.rejected, (state, action) => {
        state.deleteLoading = false;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.deleteLoading = false;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.deleteLoading = false;
      });
  },
});

export const selectProduct = (state: RootState) => state.products;

export default productSlice.reducer;
