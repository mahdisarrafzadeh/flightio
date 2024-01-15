import axios from "axios";

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

const axiosBase = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosBase;
