import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ProductDataService from "../../services/product.service";
import { RootState } from "../store";
import {
  IFormInput,
  Product,
  ProductInitialState,
} from "@/interfaces/product.interfaces";
import { toast } from "react-hot-toast";

export const initialState: ProductInitialState = {
  products: undefined,
  productDetail: undefined,
  status: "idle",
  error: undefined,
  deleteLoading: false,
  updateLoading: false,
};

export const retrieveProducts = createAsyncThunk(
  "products/retrieve",
  async () => {
    const res = await ProductDataService.getAll();
    if ("error" in res) {
      toast.error("Something Wrong");
    } else {
      return res?.data;
    }
  }
);

export const retrieveProductById = createAsyncThunk(
  "products/retrieveProductById",
  async (id: number) => {
    const res = await ProductDataService.getById(id);
    if ("error" in res) {
      toast.error("Something Wrong");
    } else {
      return res?.data;
    }
  }
);

export const deleteProductById = createAsyncThunk(
  "products/delete",
  async (data: { id: number; onSuccess: Function }) => {
    const res = await ProductDataService.delete(data.id);
    if ("error" in res) {
      toast.error("Something Wrong");
    } else {
      toast.success(`Product Delete Successfully`);
      data.onSuccess();
    }
  }
);

export const updateProduct = createAsyncThunk(
  "products/update",
  async (data: { data: IFormInput; onSuccess: Function }) => {
    const res = await ProductDataService.update(data.data);
    if ("error" in res) {
      toast.error("Something Wrong");
    } else {
      toast.success(`Product Update Successfully`);
      data.onSuccess();
    }
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

export const { sortProductsByCheapest, sortProductsByExpensive } =
  productSlice.actions;

export const selectProduct = (state: RootState) => state.products;

export default productSlice.reducer;
