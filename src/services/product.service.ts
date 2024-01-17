import axiosBase from "./api";

class TutorialDataService {
  getAll() {
    return axiosBase.get("/products");
  }

  getById(id: number) {
    return axiosBase.get(`/products/${id}`);
  }

  delete(id: number) {
    return axiosBase.delete(`/products/${id}`);
  }
}

export default new TutorialDataService();
