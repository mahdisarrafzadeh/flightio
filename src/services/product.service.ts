import axiosBase from "./api";

class TutorialDataService {
  getAll() {
    return axiosBase.get("/tutorials");
  }

  getById(id: string) {
    return axiosBase.get(`/tutorials/${id}`);
  }

  create(data: any) {
    return axiosBase.post("/tutorials", data);
  }
}

export default new TutorialDataService();
