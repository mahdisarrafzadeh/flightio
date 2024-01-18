import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

import axiosBase from "@/services/api";
import { IFormInput } from "@/interfaces/product.interfaces";

const url = {
  products: "/products",
};

export const retrieveProducts = createAsyncThunk(
  "products/retrieve",
  async () => {
    try {
      const res = await axiosBase.get(url.products);
      return res?.data;
    } catch (error) {
      toast.error("Something went wrong while retrieving products");
      throw error;
    }
  }
);

export const retrieveProductById = createAsyncThunk(
  "products/retrieveProductById",
  async (id: number) => {
    try {
      const res = await axiosBase.get(`${url.products}/${id}`);
      return res?.data;
    } catch (error) {
      toast.error("Something went wrong while retrieving the product");
      throw error;
    }
  }
);

export const deleteProductById = createAsyncThunk(
  "products/delete",
  async (data: { id: number; onSuccess: Function }) => {
    try {
      await axiosBase.delete(`${url.products}/${data.id}`);
      toast.success(`Product deleted successfully`);
      data.onSuccess();
    } catch (error) {
      toast.error("Something went wrong while deleting the product");
      throw error;
    }
  }
);

export const updateProduct = createAsyncThunk(
  "products/update",
  async (data: { data: IFormInput; onSuccess: Function }) => {
    try {
      await axiosBase.patch(`${url.products}/${data.data.id}`, data.data);
      toast.success(`Product updated successfully`);
      data.onSuccess();
    } catch (error) {
      toast.error("Something went wrong while updating the product");
      throw error;
    }
  }
);
