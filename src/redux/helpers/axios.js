import axios from "axios";
import { BASE_URL } from "./urlConfig";
import { store } from "../index";

let token;
if (typeof window !== "undefined") {
  token = localStorage.getItem("token");
}

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: token ? `Bearer ${token}` : "",
  },
});

axiosInstance.interceptors.request.use((req) => {
  const { auth } = store.getState();
  if (auth.token) {
    req.headers.Authorization = `Bearer ${auth.token}`;
  }
  return req;
});

export default axiosInstance;
