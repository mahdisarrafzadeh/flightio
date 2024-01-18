import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

import axiosBase from "@/services/api";
import { IFormInput } from "@/interfaces/product.interfaces";

export const retrieveProducts = createAsyncThunk(
  "products/retrieve",
  async () => {
    const res = await axiosBase.get("/products");
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
    const res = await axiosBase.get(`/products/${id}`);
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
    const res = await axiosBase.delete(`/products/${data.id}`);
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
    const res = await axiosBase.patch(`/products/${data.data.id}`, data.data);
    if ("error" in res) {
      toast.error("Something Wrong");
    } else {
      toast.success(`Product Update Successfully`);
      data.onSuccess();
    }
  }
);
