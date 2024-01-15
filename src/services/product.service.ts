import axiosBase from "./api";

class TutorialDataService {
  getAll() {
    return axiosBase.get("/products");
  }

  getById(id: string) {
    return axiosBase.get(`/tutorials/${id}`);
  }

  create(data: any) {
    return axiosBase.post("/products", data);
  }
}

export default new TutorialDataService();
