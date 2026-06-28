import axios from "axios";
import { INVENTORY_URL } from "./urlConfig";
import { store } from "../index";

let token;
if (typeof window !== "undefined") {
  token = localStorage.getItem("token");
}

const inventory = axios.create({
  baseURL: INVENTORY_URL,
  headers: {
    Authorization: token ? `Bearer ${token}` : "",
  },
});

inventory.interceptors.request.use((req) => {
  const { auth } = store.getState();
  if (auth.token) {
    req.headers.Authorization = `Bearer ${auth.token}`;
  }
  return req;
});

export default inventory;
