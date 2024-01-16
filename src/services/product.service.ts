import axiosBase from "./api";

class TutorialDataService {
  getAll() {
    return axiosBase.get("/products");
  }

  getById(id: number) {
    return axiosBase.get(`/products/${id}`);
  }

  create(data: any) {
    return axiosBase.post("/products", data);
  }
}

export default new TutorialDataService();
