import { IFormInput } from "@/interfaces/product.interfaces";
import axiosBase from "./api";

class ProductDataService {
  getAll() {
    return axiosBase.get("/products");
  }

  getById(id: number) {
    return axiosBase.get(`/products/${id}`);
  }

  delete(id: number) {
    return axiosBase.delete(`/products/${id}`);
  }
  update(data: IFormInput) {
    return axiosBase.patch(`/products/${data.id}`, {
      data,
    });
  }
}

export default new ProductDataService();
