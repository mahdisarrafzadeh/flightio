import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ProductDataService from "../../services/product.service";
import { RootState } from "../store";
import {
  IFormInput,
  Product,
  ProductInitialState,
} from "@/interfaces/product.interfaces";

export const initialState: ProductInitialState = {
  products: [],
  productDetail: undefined,
  status: "idle",
  error: undefined,
  deleteLoading: false,
};

export const retrieveProducts = createAsyncThunk(
  "products/retrieve",
  async () => {
    const result = await ProductDataService.getAll();
    if ("error" in result) {
    } else {
      return result?.data;
    }
  }
);

export const retrieveProductById = createAsyncThunk(
  "products/retrieveProductById",
  async (id: number) => {
    const res = await ProductDataService.getById(id);
    return res?.data;
  }
);

export const deleteProductById = createAsyncThunk(
  "products/delete",
  async (id: number) => {
    const res = await ProductDataService.delete(id);
    return res?.data;
  }
);

export const updateProduct = createAsyncThunk(
  "products/update",
  async (data: IFormInput) => {
    const res = await ProductDataService.update(data);
    return res?.data;
  }
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    sortProductsByCheapest: (state) => {
      state.products &&
        state.products.sort((a, b) => {
          if (a.price && b.price) {
            return a.price - b.price;
          }
          return a.price ? -1 : b.price ? 1 : 0;
        });
    },
    sortProductsByExpensive: (state) => {
      state.products &&
        state.products.sort((a, b) => {
          if (a.price && b.price) {
            return b.price - a.price;
          }
          return b.price ? -1 : a.price ? 1 : 0;
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
        state.productDetail = undefined;
      })
      .addCase(deleteProductById.fulfilled, (state) => {
        state.deleteLoading = false;
      })
      .addCase(deleteProductById.rejected, (state) => {
        state.deleteLoading = false;
      })
      .addCase(updateProduct.fulfilled, (state) => {
        state.deleteLoading = false;
      })
      .addCase(updateProduct.rejected, (state) => {
        state.deleteLoading = false;
      });
  },
});

export const { sortProductsByCheapest, sortProductsByExpensive } =
  productSlice.actions;

export const selectProduct = (state: RootState) => state.products;

export default productSlice.reducer;
